const {Product, Reviews } = require("../models/productModel");
const asyncHandler = require('express-async-handler');
const cloudinary = require('cloudinary');

const {
  updateById,
  deleteOne
} = require('./operations');

exports.deleteProduct       = deleteOne(Product);
exports.update_product_ById = updateById(Product);

exports.addProduct          = asyncHandler(async(req, res)=>{
  let product = await  Product.findOne({name : req.body.name});
  if(product) return res.json({message : "Product Already Exists.", _id: product._id});

  if(req.file){
      let img = await cloudinary.uploader.upload(image, {folder : 'products'});
      product = new Product({
        name,
        category,
        brand,
        description,
        price,
        countInStock,
        image : img.secure_url});
  }

  product = new Product(req.body);
  await product.save();
  return res.status(200).json({message : "Successfully added", product});  
});

exports.get_all_products    =  asyncHandler(async(req, res)=>{
  await Product.find()
               .populate('reviews')
               .then((products)=>{res.json({count : products.length, products})})
               .catch(err =>{res.status(500).json(err)})

});

exports.get_product_ById    =  asyncHandler(async(req, res)=>{
  await Product.findById( req.params.id )
              .populate('reviews')
              .then((product)=>{res.json(product)})
              .catch(err =>{res.status(500).json(err)})

});
// @desc create new review
// @route POST api/product/:id/review
exports.createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment } = req.body;
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating should be between 1 and 5." });
    }
    let product = await Product.findById(req.params.id);
    if(product){
      let review = new Reviews({productId: req.params.id, userId: req.user._id, rating, comment  })
      await review.save()
    //Update the associated product with the new review
    await product.updateOne( 
        {$push : {reviews : review._id}},
        {new : true}
      );
        
  //  await Product.findOne({_id:req.params.id}).populate("reviews")
  //     .then( review =>{
  //       res.status(200).json({
  //         count   : review.length,
  //         reviews :  review
  //       });
  //   });
    res.status(200).json({
      message: "added successfully",
      review
    })
  }
    else {
      res.status(404).json({ message: "product not found" });
    }
});

// @desc filtration
// @route GET api/product/filter?name=&brand=&category=&price=
exports.filter = asyncHandler(async (req, res) => {
  let queryRegx = req.query;
  const data = await Product.find({
   $and: [
    { name   : { $regex: queryRegx.name  }},
    { price  : { $lte : queryRegx.price  }},
    { brand  : { $regex: queryRegx.brand }},
    { category:{ $regex: queryRegx.category }}
  ]
  });
  if(data.length == 0) return res.status(404).json({message: "Not found!"});
  res.status(200).json({data});
});