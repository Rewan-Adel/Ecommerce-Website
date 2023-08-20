const Cart = require('../models/cartModel')
const User = require('../models/userModel')
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
    const cart = req.body;
    const _id  = req.user;
    const user = User.findById(_id);
    const products = [];

    // check if user already have product in cart
    const cartExists = Cart.findOne({userId : user._id});
    if(cartExists) cartExists.findOneAndRemove({userId:_id});

    for(let i=0; i<cart.length ; i++){
        let obj = {};
        obj.product = cart[i]._id;
        obj.count   = cart[i].count;
        let getPrice = await Cart.findById(cart[i]._id ).select("price").exec();
        obj.price = getPrice;
        products.push(obj);
    }

    let totalCart = 0;
    for(let i=0; i<products.length ; i++){
        totalCart = totalCart + products[i].price * products[i].count ;
    }
    let newCart = new cart({
            userId: user._id,
            products,
            totalCart
    });
    await newCart.save()
    res.status(200).json({newCart})
});
