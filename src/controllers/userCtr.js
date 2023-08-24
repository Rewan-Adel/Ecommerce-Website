const User = require('../models/userModel')
const validator = require("validator");
const asyncHandler = require('express-async-handler');

const {
  getAll,
  getById,
  updateById,
  deleteOne,
  get_ByKey
} = require('./operations');

exports.getAllUsers = getAll(User);
exports.getOne      = getById(User);
exports.DeleteOne   = deleteOne(User);
exports.searchUser  = get_ByKey(User);
exports.updateOne   = updateById(User);
 
exports.adminTrue  =  asyncHandler(async(req, res)=>{
  let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true})
    if(!user)
      return res.status(404).json({'message': "user not found"});
    await user.save();
    return res.json({
      message : `${user.firstName} ${last.firstName} is admin `,
      user
    });
}); 

exports.adminFalse  =  asyncHandler(async(req, res)=>{
  let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:false})
    if(!user)
      return res.status(404).json({'message': "user not found"});
    await user.save();
    return res.json({
      message : `${user.firstName} ${last.firstName} is admin `,
      user
    });
}); 
// exports.blockUser = asyncHandler(async(req,res)=>{}