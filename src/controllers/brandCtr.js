const Brand = require("../models/brandModel");

const {
  addNew,
  getAll,
  getById,
  updateById,
  deleteOne,
  // get_ByKey 
} = require('./operations');

exports.add_brand         = addNew(Brand);
exports.get_all_brands    = getAll(Brand);
exports.delete_brand      = deleteOne(Brand);
exports.get_brand_ById    = getById(Brand);
exports.update_brand_ById = updateById(Brand); 
// exports.get_brand_ByKey   = get_ByKey(Brand);


