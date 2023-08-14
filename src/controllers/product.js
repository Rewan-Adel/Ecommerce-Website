const Product = require("../models/product").Product;
const Review = require("../models/product").review;
const { cloudinary } = require("../util/cloudinary");

//@desc basic crud operation
const addProduct = async (req, res) => {
  const {name, category, brand, description, price, image,  countInStock } = req.body;
  try {
    let product = await Product.findOne({ name });
    if (product) {
      res.status(409).json({
        message: "Product already exists",
        product
      });
    }
    
    if(req.file){
        const result = await cloudinary.uploader.upload(image, {
         folder: "products",
        });

        product = new Product({
          //userId: user,
          name,
          category,
          brand,
          description,
          price,
          countInStock,
          image: result.secure_url,
    });
    } 
   else{
    product = new Product({
      name,
      description,
      category,
      brand,
      price,
      countInStock,
});
  }
    await product.save();
    res.status(200).json({
      message: "Product is added",
      product
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const update_product_ById = async (req, res) => {
  const { name, description, price, image, category, brand, user, countInStock } =
  req.body;
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "product is not found!",
      });
    }
    
    let updatedProduct;
    
    // if (image !== null) {
      if (req.file) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
      updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        brand,
        price,
        quantity,
        image: result.secure_url,
      });
    } else {
      updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        category,
        brand,
        price,
        countInStock,
      });
    }

    return res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let result = await Product.deleteOne({ _id: req.params.id });
    
    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");

      return res.status(200).json({
        message: "Successfully deleted one document.",
      });
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
      return res.status(404).json({
        message: "No documents matched the query. Deleted 0 documents.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
      "status code": 500,
    });
  }
};

const get_all_products = async (req, res) => {
  try {
    let products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const get_product_ById = async (req, res) => {
  try {
    let product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "product is not found!",
      });
    }
    return res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
// @desc Search 
// @route POST api/product/search/:id
const get_product_ByKey = async(req, res) =>{
  try{
  let data = await Product.find({
    $or :[
        { name     : { $regex : req.params.key}},
        { category : { $regex : req.params.key }},
        { brand    : { $regex : req.params.key }},
  ]});
  if( data.length > 0) {res.send(data)}
  else{ 
     return res.status(404).json({
          "message": "item not found!",
          "status code": 404})      
      }
}catch (err) {
  console.log(err);
  res.status(500).json({
    message: "Internal Server Error!",
  });
}
};

const get_product_ByName = async(req, res)=>{
  try{
  let data = await Product.find({name:{ $regex : req.params.key}})
  if( data.length > 0) {res.send(data)}
  else{ 
      res.status(400).json({
          "message": "item not found!",
          "status code": 400})      
      }
    }catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal Server Error!",
      });
   }
};

const get_product_ByCategory = async(req, res)=>{
  try{
      let data = await Product.find({category:{ $regex : req.params.key}})
      if( data.length > 0) {res.send(data)}
      return res.status(404).json({
              "message": "item not found!",
              "status code": 404});        
}catch (err) {
  console.log(err);
  res.status(500).json({
    message: "Internal Server Error!",
  });
}
};

const get_product_ByBrand =  async(req, res)=>{
  try{
  let data = await Product.find({brand:{ $regex : req.params.key}})
  if( data.length > 0) {res.send(data)}
  res.status(404).json({
          "message": "item not found!",
          "status code": 404})        
  }catch (err) {
          console.log(err);
          res.status(500).json({
            message: "Internal Server Error!",
          });
        }        
};  

const get_product_ByPrice = async(req, res)=>{
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
};

const get_product_ByRating = async(req, res)=>{
  try{
  let data = await Product.find({rating : {$gte : req.params.key} })
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
}; 

// @desc create new review
// @route POST api/product/:id/review
const createProductReview = async (req, res) => {
  const {userId, rating, comment } = req.body;
  try {
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating should be between 1 and 5." });
    }
    let product = await Product.findById(req.params.id);
    if(product) {
      let review = new Review({
        product : req.params.id, 
        user : userId,
        rating,
        comment 
      })
     review = await review.save()
     if(review){
        //Update the associated product with the new review
        product.updateOne( 
          {$push : {reviews : review._id}},
          {new : true}
        );
    };    

    product =   .find().populate('reviews');
     //console.log(product)
      return res.json({ message: "rating added" });
    }
    else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = {
  addProduct,
  deleteProduct,
  update_product_ById,
  createProductReview,
  
  get_all_products,
  get_product_ByKey,
  get_product_ById,
  get_product_ByName,
  get_product_ByCategory,
  get_product_ByBrand,
  get_product_ByPrice,
  get_product_ByRating
};
