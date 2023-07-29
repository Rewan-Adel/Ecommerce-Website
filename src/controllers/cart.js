const cart = require('../models/cart')
const Cart = require('../models/cart')

const addCart = async(req, res)=>{
    try{
        cart = new cart({
            userId: req.body.name,
            products: {
                prodectId: req.body.prodectId,
                quantity: req.body.quantity
            }
        })
        await cart.save()
        res.status(200).json({
            "userId": cart.userId,
            "products": {
                "prodectId": cart.prodectId,
                "quantity":  cart.quantity,
            }
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const get_all_carts =  async(req, res)=>{
    try{
        let cart = await Cart.find().select()
        return res.status(200).json({ cart })      
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
//get user cart
const get_ById =  async(req, res)=>{
    try{
        let cart = await cart.findById({_id: req.params.id})
        if(!cart){
            return res.status(400).json({
                "message": "cart is not found!",
                "status code": 400
            })
        }
    return res.json({cart})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const update_cart_ById =  async(req, res)=>{
    try{
        let cart = await cart.findByIdAndUpdate(req.params.id, req.body)
        return res.json({cart})   
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const deleteCart = async(req, res)=>{
    try{
        let cart =await cart.findOneAndRemove(req.params.id)
        if(!cart){
            return res.status(400).json({
                "message": "cart is not found!",
                "status code": 40
            })
        }
        return res.status(200).json({
            "message": "cart is deleted",
            "status code": 200
        })
        
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
module.exports = {
    addCart, 
    get_all_carts,
    update_cart_ById, 
    get_ById,
    deleteCart}