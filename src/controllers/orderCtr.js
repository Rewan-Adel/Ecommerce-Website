const asyncHandler = require('express-async-handler');
const Cart =  require('../models/cartModel');
const Order =  require('../models/orderModel');
const {Product} =  require('../models/productModel');

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const {
    getAll,
    getById,
    updateById,
    deleteOne,
  } = require('./operations');

exports.delete_order      = deleteOne(Order);
exports.get_all_orders    = getAll(Order);
exports.get_order_ById    = getById(Order);
exports.update_order_ById = updateById(Order);

exports.addOrder = async(req, res) => {
  const cart = await Cart.findOne({_id: req.body.cartId});
  if(!cart) return res.json("the cart is empty!");

  const customer = stripe.customers.create({
      metadata:{
      userId : cart.userId,
      cart   : JSON.stringify(cart.items)
    }
  });
  //Define product information when you create the Checkout Session 
  //using predefined price IDs or on the fly with price_data
    const line_items = cart.items?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item.productId,
            },
          },
          unit_amount: item.price * 100,
        },
      quantity:  cart.totalPrice,

      };
    });

    //A Checkout Session is the programmatic representation of what your customer sees
    const session = await stripe.checkout.sessions.create({
      payment_method_types : ['card'],
      line_items: line_items,
      mode: 'payment',
   //   customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/api/order/${cart.userId}`,
      cancel_url : `${process.env.CLIENT_URL}/cancel`,
    });
    const {_id} = req.user;
    const order = new Order({
      userId  :   _id,
      products:   cart.items,
      amount  :   cart.amount ,
      totalPrice: cart.totalPrice,
      payment_status: "delivered",
    });
    
    const productId = cart.items?.map((item) => {return item.productId});
    for(let i=0; i < productId.length; i++){
      const count   = cart.items?.map((item) => {return item.count});
      const product = await Product.findById(productId[i]);
      product.countInStock =   product.countInStock  - count[i];
      await product.save();
    }
    await order.save();
    await Cart.deleteOne({_id:req.body.cartId})
    res.json({URL: session.url});
  };

exports.income = asyncHandler(async(req, res)=>{
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()-1)); 
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
  res.send(income);
});