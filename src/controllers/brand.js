const Brand = require("../models/brand");

const addBrand = async (req, res) => {
  try {
    let brand = await Brand.findOne({ name: req.body.name });
    if (brand) {
      res.status(409).json({
        message: "Brand already exists",
      });
    } else {
      brand = new Brand({
        name: req.body.name,
      });
      await brand.save();
      res.status(200).json({
        message: "Brand is added",
        id: brand._id,
        name: brand.name,
        createdAt: brand.createdAt,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const get_all_brands = async (req, res) => {
  try {
    let brands = await Brand.find();
    return res.status(200).json(brands);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteBrand = async (req, res) => {
  try {
    let result = await Brand.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      return res.status(200).json({
        message: "Successfully deleted one document.",
      });
    } else {
      return res.status(404).json({
        message: "No documents matched the query. Deleted 0 documents.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  addBrand,
  get_all_brands,
  deleteBrand,
};
