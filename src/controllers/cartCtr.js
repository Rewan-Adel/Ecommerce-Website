const Cart = require('../models/cartModel');
const {Product} = require("../models/productModel");
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const {
    getAll,
    updateById,
    deleteOne
  } = require('./operations');

exports.get_all_carts    = getAll(Cart);
exports.delete_cart      = deleteOne(Cart);
exports.update_cart_ById = updateById(Cart);


exports.newCart = asyncHandler(async(req, res)=>{
  const cart = req.body.items;
  const user = await User.findById(req.body.userId);
    if(!user) return res.status(404).json({message: "User not found!"});
    
    const cartExists = await Cart.findOne({userId : user._id});
    if(cartExists)   cartExists.deleteOne();

    const products = [];
    for(let i=0; i < cart.length; i++){
      let obj = {};
      const product = await Product.findById(cart[i].productId);
      if(!product || product.countInStock == 0) 
        return res.status(404).json({message : `${product.name} is not  available`});
        
      if(cart[i].count > product.countInStock) 
        return res.status(400).json({message : `${product.name} only exist ${product.countInStock} item`})
      
      obj.productId = cart[i].productId;              
      obj.count     = cart[i].count;
      obj.price     = product.price;
      obj.name      = product.name;
      obj.image     = product.image;
      products.push(obj);
      }
     
    let totalPrice = 0;
    let amount = 0; 
    for(let i=0; i< products.length ; i++){
      if(! products[i].count)  
        products[i].count = 1;

      totalPrice = totalPrice + products[i].price * products[i].count; 
      amount += products[i].count ; 
      }

      let newCart = new Cart({
        userId    : user._id,
        items     : products,
        totalPrice: totalPrice,
        amount    : amount
      });
  await newCart.save();
  res.redirect(`http://localhost:8080/api/cart/${newCart._id}`);
});

exports.get_cart_ById  = asyncHandler(async(req, res)=>{ 
  const cartExists = await Cart.findById(req.params.id);
  if(!cartExists)
    return res.status(404).json({message : "Cart is empty"});
  
  return res.status(200).json(cartExists);
  
});


