const Cart = require('../models/cartModel');
const {Product} = require("../models/productModel");
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const {
    getAll,
    getById,
    updateById,
    deleteOne
  } = require('./operations');

exports.get_all_carts    = getAll(Cart);
exports.delete_cart      = deleteOne(Cart);
exports.get_cart_ById    = getById(Cart);
exports.update_cart_ById = updateById(Cart);
  
exports.add_cart = asyncHandler(async(req, res)=>{
    const cart = req.body.items;
    const _id  = req.body.userId;
    const user = await User.findById(_id);
    const products = [];
    // check if user already have product in cart
    const cartExists = await Cart.findOne({userId :_id});
    if(cartExists) {
     await cartExists.deleteOne();
    }
  
    for(let i=0; i < cart.length; i++){
      let obj = {};
      let product  = await Product.findById(cart[i].productId).select(["name","price"]).exec();
      
      obj.productId = cart[i].productId;        
      obj.name = cart[i].name;        
      obj.count     = cart[i].count;
      obj.price     = product.price;
      products.push(obj);
      }

      // let  crt = req.body.products 
      // res.status(200).json(crt.length)

    let totalCart = 0;
    for(let i=0; i< products.length ; i++){
      if(! products[i].count) products[i].count = 1;
        totalCart = totalCart + products[i].price * products[i].count; 
      }

    let newCart = new Cart({
        userId: user._id,
        products : products,
        cartTotal: totalCart
    });
    await newCart.save()
    await newCart.updateOne(
      {$push : { items : products, totalCart: totalCart}},
      {new : true}
    );

    await Cart.findOne({_id : newCart._id}).populate("items")
    .then( cart =>{
      res.status(200).json({cart});
  });

    // console.log(products, totalCart);
    //  res.status(200).json(newCart);

});
