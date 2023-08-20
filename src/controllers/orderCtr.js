const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

const {
    getAll,
    getById,
    updateById,
    deleteOne,
  } = require('./operations');

exports.get_all_orders    = getAll(Order);
exports.delete_order      = deleteOne(Order);
exports.get_order_ById    = getById(Order);
exports.update_order_ById = updateById(Order);

exports.new_order = asyncHandler(async(req, res)=>{

});