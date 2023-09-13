const Brand = require("../models/brand");

const {
  getAll,
  getById,
  updateById,
  deleteOne,
  get_ByKey 
} = require('./operations');

exports.get_all_brands    = getAll(Brand);
exports.delete_brand      = deleteOne(Brand);
exports.get_brand_ById    = getById(Brand);
exports.update_brand_ById = updateById(Brand); 
exports.get_brand_ByKey   = get_ByKey(Brand);


