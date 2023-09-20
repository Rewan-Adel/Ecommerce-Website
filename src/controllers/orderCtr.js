const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');

const {
    addNew,
    getAll,
    getById,
    updateById,
    deleteOne,
  } = require('./operations');

exports.delete_order      = deleteOne(Order);
exports.get_all_orders    = getAll(Order);
exports.get_order_ById    = getById(Order);
exports.update_order_ById = updateById(Order);

exports.addOrder          = asyncHandler(async(req, res)=>{
  // let orderExist = await Order.findOne({userId:req.body.userId});
  // if(orderExist) orderExist.deleteOne();
  let cart = req.body.cartId;
  if(cart.length == 0) 
   return res.status(400).json({ message: 'Cart is empty.'});
  
  addNew(Order); 
});


exports.income = asyncHandler(async(req, res)=>{
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()-1)); 
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
  res.send(income);
});