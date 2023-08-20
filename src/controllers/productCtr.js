const {Product, Reviews } = require("../models/productModel");
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary');
const {
  addNew, 
  getAll,
  getById,
  updateById,
  deleteOne,
  get_ByKey
} = require('./operations');

exports.get_all_products    = getAll(Product);
exports.deleteProduct       = deleteOne(Product);
exports.get_product_ById    = getById(Product);
exports.update_product_ById = updateById(Product);

exports.addProduct          = asyncHandler(async(req, res)=>{
  let product = Product.find({name : req.body.name});
  if(product) res.json({message : "Product Already Exists.", product});
  else{
    if(req.file){
      let img = await cloudinary.uploader.upload(image, {folder : 'products'});
      product = new Product({
        name,
        category,
        brand,
        description,
        price,
        countInStock,
        avatar : img.secure_url});
      return res.status(200).json({message : "Successfully added", product});  
    }
    else addNew(Product);
};
});

// @desc create new review
// @route POST api/product/:id/review
exports.createProductReview = asyncHandler(async (req, res) => {
  const {userId, rating, comment } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating should be between 1 and 5." });
    }
    let product = await Product.findById(req.params.id);
    if(product){
      let review = new Reviews({product : req.params.id, user : userId, rating, comment  })
      await review.save()
    //Update the associated product with the new review
    await product.updateOne( 
        {$push : {reviews : review._id}},
        {new : true}
      )
        
   await Product.findOne({_id:req.params.id}).populate("reviews")
      .then( review =>{
        res.status(200).json({
          count   : review.length,
          reviews :  review
        });
    });
    console.log(product.reviews);    
  }
    else {
      res.status(404).json({ message: "product not found" });
    }
});

// @desc Search )
// @route POST api/product/search/:id
exports.get_product_ByKey = get_ByKey(Product);
exports.get_product_ByName = asyncHandler(async(req, res)=>{
  let data = await Product.find({name:{ $regex : req.params.key}})
  if( data.length > 0) {res.send(data)}
  else{ 
      res.status(400).json({
          "message": "item not found!",
          "status code": 400})      
        }
});

exports.get_product_ByCategory =asyncHandler(async(req, res)=>{
  
      let data = await Product.find({category:{ $regex : req.params.key}})
      if( data.length > 0) {res.send(data)}
      return res.status(404).json({
              "message": "item not found!",
              "status code": 404});        
});

exports.get_product_ByBrand =  asyncHandler(async(req, res)=>{
  let data = await Product.find({brand:{ $regex : req.params.key}})
  if( data.length > 0) {res.send(data)}
  res.status(404).json({
          "message": "item not found!",
          "status code": 404})              
});  

exports.get_product_ByPrice = asyncHandler(async(req, res)=>{
  try{
  let data = await Product.find({ price : {$lte : req.params.key} })
  if( data.length > 0) {res.send(data)}
  res.status(404).json({
          "message": "item not found!",
          "status code": 404})        
      }catch(err){
          console.log(err);
          res.status(500).json({
            message: "Internal Server Error!",
          });
        }
});

exports.get_product_ByRating = asyncHandler(async(req, res)=>{
  let data = await Product.find({rating : {$gte : req.params.key} })
  if( data.length > 0) {res.send(data)}
  res.status(404).json({
          "message": "item not found!",
          "status code": 404}) 
});          


