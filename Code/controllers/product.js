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
      user,
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
    let products = await Product.find().select({ name: 1, category: 1 });
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
      return res.status(400).json({
        message: "product is not found!",
      });
    }
    return res.json({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
const update_product_ById = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body);
    if (!product) {
      return res.status(400).json({
        message: "product is not found!",
      });
    }
    console.log();
    return res.json({
      id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    let product = await Product.findOneAndRemove(req.params.id);
    if (!product) {
      return res.status(400).json({
        message: "product is not found!",
      });
    }
    return res.status(200).json({
      message: "product is deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};
module.exports = {
  addProduct,
  deleteProduct,
  get_all_products,
  get_product_ById,
  update_product_ById,
};
