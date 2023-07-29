const asyncHandler = require('express-async-handler')
const Product = require("../models/product")

const srchByName = asyncHandler(async(req, res)=>{
    let data = await Product.find({name:{ $regex : req.params.key}})
    if( data.length > 0) {res.send(data)}
    else{ 
        res.status(400).json({
            "message": "item not found!",
            "status code": 400})      
        }
})    
const srchByCategory = asyncHandler(async(req, res)=>{
        let data = await Product.find({category:{ $regex : req.params.key}})
        if( data.length > 0) {res.send(data)}
        res.status(400).json({
                "message": "item not found!",
                "status code": 400})        
})
const srchByBrand = asyncHandler(async(req, res)=>{
    let data = await Product.find({brand:{ $regex : req.params.key}})
    if( data.length > 0) {res.send(data)}
    res.status(400).json({
            "message": "item not found!",
            "status code": 400})        
})  

const srchByPrice = asyncHandler(async(req, res)=>{
    let data = await Product.find({ price : {$lte : req.params.key} })
    if( data.length > 0) {res.send(data)}
    res.status(400).json({
            "message": "item not found!",
            "status code": 400})        
}) 
const srchByRating = asyncHandler(async(req, res)=>{
    let data = await Product.find({rating : {$gte : req.params.key} })
    if( data.length > 0) {res.send(data)}
    res.status(400).json({
            "message": "item not found!",
            "status code": 400})        
})  
module.exports={ srchByName, srchByCategory, srchByBrand, srchByPrice, srchByRating}