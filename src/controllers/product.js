const Product = require("../models/product");
const { cloudinary } = require("../util/cloudinary");

const addProduct = async (req, res) => {
  const { name, description, price, image, category, brand, user, quantity } =
    req.body;
  try {
    let product = await Product.findOne({ name });
    if (product) {
      res.status(409).json({
        message: "Product already exists",
        id: product._id,
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
      });
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "products",
    });

    product = new Product({
      userId: user,
      name,
      description,
      category,
      brand,
      price,
      quantity,
      image: result.secure_url,
    });
    await product.save();
    res.status(200).json({
      message: "Product is added",
      id: product._id,
      user: product.user,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      price: product.brand,
      image: product.image,
      quantity: product.quantity,
      createdAt: product.createdAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
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

const get_products_by_category = async (req, res) => {
  try {
    let products = await Product.find({ category: req.params.id });
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
const update_product_ById = async (req, res) => {
  const { name, description, price, image, category, brand, user, quantity } =
    req.body;
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) {
      return res.status(404).json({
        message: "product is not found!",
      });
    }

    let updatedProduct;

    if (image !== null) {
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
        quantity,
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

// @desc create new review
// @route POST api/product/:id/review
const createProductReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating should be between 1 and 5." });
    }
    const product = await Product.findById(req.params.id);
    if (product) {
      product.rating = rating;
      product.comment = comment;

      await product.save();
      console.log(req.body);
      return res.json({ message: "rating added" });
    } else {
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
  get_all_products,
  get_product_ById,
  update_product_ById,
  createProductReview,
  get_products_by_category,
};
