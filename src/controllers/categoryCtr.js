const Category = require("../models/categoryModel");

const {
  addNew,
  getAll,
  getById,
  updateById,
  deleteOne,
} = require('./operations');

exports.add_category         = addNew(Category);
exports.get_all_categories   = getAll(Category);
exports.delete_category      = deleteOne(Category);
exports.get_category_ById    = getById(Category);
exports.update_category_ById = updateById(Category); 


