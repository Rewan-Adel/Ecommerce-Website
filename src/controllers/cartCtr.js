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


exports.addToCart = asyncHandler(async(req, res)=>{
  const cart = req.body.items;
  const user = await User.findById(req.body.userId);
    if(!user) return res.status(404).json({message: "User not found!"});
    
    const cartExists = await Cart.findOne({userId : user._id});
    if(cartExists)   cartExists.deleteOne();

    const products = [];
    for(let i=0; i < cart.length; i++){
      let obj = {};
      const product = await Product.findById(cart[i].productId);
      if(! product) return res.status(404).json({message : 'Not found!'});
      
      obj.productId = cart[i].productId;              
      obj.count     = cart[i].count;
      obj.name      = product.name;
      obj.image     = product.image;
      obj.price     = product.price;
      products.push(obj);
      }
     
    let totalPrice = 0;
    for(let i=0; i< products.length ; i++){
      if(! products[i].count)  
        products[i].count = 1;

      totalPrice = totalPrice + products[i].price * products[i].count; 
      }

      let newCart = new Cart({
        userId    : user._id,
        items     : products,
        totalPrice: totalPrice,
      });
  await newCart.save();
  res.cart = newCart._id;
  console.log(res.cart)
  res.redirect(`http://localhost:8080/api/cart/${newCart._id}`);
});

exports.get_cart_ById  = asyncHandler(async(req, res)=>{ 
  const cartExists = await Cart.findById(req.params.id);
  if(!cartExists)
    return res.status(404).json({message : "Cart is empty"});
  
  return res.status(200).json({items: cartExists.items, totalPrice: cartExists.totalPrice});
  
});

exports.deleteOneItem =  asyncHandler(async(req, res)=>{
  const item = req.params.id;
  let cart = await Cart.findById(req.body.cartId);
  if(!cart) 
    return res.status(404).json({message: "Not found the cart"});

  for(let i=0 ; i< cart.length ; i++){
    const product = await Product.findById(cart.items[i].productId);
    if(cart[i].items.count > 1){
      cart[i].items.count--;
      cart[i].totalPrice -= product.price ;  
  }else{
    await cart.updateOne(
     { $pull : {'items.productId': item}} 
    );
  }
  console.log(cart.items[i].count)
}
  
return res.redirect(`http://localhost:8080/api/cart/${cart._id}`);

});
