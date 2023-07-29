const Order = require('../models/order')

const addOrder = async(req, res)=>{
    try{
        order = new Order({
            userId: req.body.userId,
            products: [{
                prodectId: req.body.prodectId,
                quantity: req.body.quantity
            }]
            ,
            amount : req.body.amount,
            address: req.body.address,
            status: req.body.status,
        })
        await order.save()
        res.status(200).json({
            "userId": order.userId,
            "products": {
                "prodectId": order.prodectId,
                "quantity":  order.quantity,
            },
            "amount": order.amount,
            "address": order.address,
            "status": order.status,
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
const get_all_orders =  async(req, res)=>{
    try{
        let order = await order.find().select()
        return res.status(200).json({ order })      
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
//get user order
const get_ById =  async(req, res)=>{
    try{
        let order = await order.findById({_id: req.params.id})
        if(!order){
            return res.status(400).json({
                "message": "order is not found!",
                "status code": 400
            })
        }
    return res.json({order})
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const update_order_ById =  async(req, res)=>{
    try{
        let order = await order.findByIdAndUpdate(req.params.id, req.body)
        return res.json({order})   
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const deleteorder = async(req, res)=>{
    try{
        let order =await order.findOneAndRemove(req.params.id)
        if(!order){
            return res.status(400).json({
                "message": "order is not found!",
                "status code": 40
            })
        }
        return res.status(200).json({
            "message": "order is deleted",
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
    addOrder, 
    get_all_orders,
    update_order_ById, 
    get_ById,
    deleteorder}