const Category = require("../models/category");

const addCategory = async (req, res) => {
  console.log(req.body);
  try {
    let category = await Category.findOne({ name: req.body.name });

    if (category) {
      res.status(409).json({
        message: "Category already exists",
      });
    } else {
      category = new Category({
        name: req.body.name,
      });
      await category.save();
      res.status(200).json({
        message: "Category is added",
        id: category._id,
        name: category.name,
        createdAt: category.createdAt,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const get_all_categories = async (req, res) => {
  try {
    let categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error!",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let result = await Category.deleteOne({ _id: req.params.id });

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
    });
  }
};

module.exports = {
  addCategory,
  get_all_categories,
  deleteCategory,
};
