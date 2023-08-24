const Order = require('../models/orderModel');

const {
    addNew,
    getAll,
    getById,
    updateById,
    deleteOne,
  } = require('./operations');

// createOrder is fired by stripe webhook
exports.addOrder          = addNew(Order);
exports.delete_order      = deleteOne(Order);
exports.get_all_orders    = getAll(Order);
exports.get_order_ById    = getById(Order);
exports.update_order_ById = updateById(Order);
