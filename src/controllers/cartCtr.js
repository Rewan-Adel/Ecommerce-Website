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
  

exports.addToCart = asyncHandler(async(req, res)=>{
    const cart = req.body.items;
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(404).json("User not found!");
    
    const cartExists = await Cart.findOne({userId : user._id});
    if(cartExists)
     cartExists.deleteOne();

    const products = [];
    for(let i=0; i < cart.length; i++){
      let obj = {};
      const product = await Product.findById(cart[i].productId);
      if(! product) return res.status(404).json({message : 'Not found!'});
      
      obj.productId = cart[i].productId;              
      obj.count     = cart[i].count;
      obj.price     = product.price;
      products.push(obj);
      }
     
    let totalPrice = 0;
    for(let i=0; i< products.length ; i++){
      totalPrice = totalPrice + products[i].price * products[i].count; 
      }

      let newCart = new Cart({
        userId    : user._id,
        items     : products,
        totalPrice: totalPrice,
      });
    await newCart.save();

  res.status(200).json({message : 'Added to cart'});

});