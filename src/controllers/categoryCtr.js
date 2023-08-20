const Category = require("../models/categoryModel");

const {
  getAll,
  getById,
  updateById,
  deleteOne,
  get_ByKey 
} = require('./operations');

exports.get_all_categories    = getAll(Category);
exports.delete_category      = deleteOne(Category);
exports.get_category_ById    = getById(Category);
exports.update_category_ById = updateById(Category); 
exports.get_category_ByKey   = get_ByKey(Category);

