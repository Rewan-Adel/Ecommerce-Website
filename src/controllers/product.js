const Product = require('../models/product')
const cloudinary = require('../util/cloudinary')

const addProduct = async(req, res)=>{
    try{
        let product = await Product.findOne({name: req.body.name})
        if(product){
            res.status(400).json({
                "message": "Product alraedy exists",
                "id": product._id,
                "status code": 400
            })
        }
        if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'online store'})
        product = new Product({
            name        : req.body.name,
            description : req.body.description,
            category    : req.body.category,
            price       : req.body.price,
            avatar      : result.secure_url
        })
        await product.save()
        return res.status(200).json({
        "message": "Product is added",
        "id": product._id,
        "name": product.name,
        "description": product.description,
        "category": product.category,
        "price": product.price,
        "avatar": product.avatar,
        "createdAt": product.createdAt,
        "updatedAt": product.updatedAt
    })
}
        product = new Product({
        name        : req.body.name,
        description : req.body.description,
        category    : req.body.category,
        price       : req.body.price,
    })
    await product.save()
    return res.status(200).json({
    "message": "Product is added",
    "id": product._id,
    "name": product.name,
    "description": product.description,
    "category": product.category,
    "price": product.price,
    "createdAt": product.createdAt,
    "updatedAt": product.updatedAt
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
const get_all_products =  async(req, res)=>{
    try{
        let product = await Product.find().select({name:1, category:1})
        return res.status(200).json({ product })      
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            "message": "Internal Server Error!",
            "status code": 500
        })
    }
}
const get_product_ById =  async(req, res)=>{
    try{
        let product = await Product.findById({_id: req.params.id})
        if(!product){
            return res.status(400).json({
                "message": "product is not found!",
                "status code": 400
            })
        }
        return res.json({
            "id": product._id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
            "price": product.price,
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
const update_product_ById =  async(req, res)=>{
    try{
        let product = await Product.findByIdAndUpdate(req.params.id, req.body)
        if(product){
            return res.json({
                "id": product._id,
                "name": product.name,
                "description": product.description,
                "category": product.category,
                "price": product.price,
                "createdAt": product.createdAt,
                "updatedAt": product.updatedAt
            })  
        }
        
        return res.status(400).json({
            "message": "product is not found!",
            "status code": 400
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
const deleteProduct = async(req, res)=>{
    try{
        let product =await Product.findByIdAndRemove(req.params.id)
        if(!product){
            return res.status(400).json({
                "message": "product is not found!",
                "status code": 40
            })
        }
        return res.status(200).json({
            "message": "product is deleted",
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
// @desc create new review  
// @route POST api/product/:id/review
const createProductReview = async(req, res)=>{
    const {rating , comment} = req.body;
    try{
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return res.status(400).json({ "message": 'Rating should be between 1 and 5.' });
          }
        const product = await  Product.findById(req.params.id)
        if(product){
            product.rating = rating ;
            product.comment = comment ;
            
            await product.save()
            console.log(req.body)
           return res.json({"message": "rating added"})
        }else{
            res.status(404).json({"message": "product not found"})
    }}
    catch(err){
        console.log(err)
        res.status(500).json({"message": "Internal Server Error!"})
    }
}
module.exports = {
    addProduct, 
    deleteProduct,
    get_all_products, 
    get_product_ById,
    update_product_ById,
    createProductReview 
    }
