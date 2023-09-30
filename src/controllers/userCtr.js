const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const {
  getAll,
  getById,
  updateById,
  deleteOne,
} = require('./operations');

exports.getAllUsers = getAll(User);
exports.getOne      = getById(User);
exports.DeleteOne   = deleteOne(User);
exports.updateOne   = updateById(User);

exports.searchUser = asyncHandler(async(req, res) =>{
    let data = await User.find(
      {$or:[
      {firstName:{ $regex : req.params.key} },
      {email: { $regex : req.params.key} }
]});
    if( data.length > 0) {res.send(data)}
    else
      return res.status(404).json({"message": "not found!"});             
  });

exports.adminTrue  =  asyncHandler(async(req, res)=>{
  let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:true})
    if(!user)
      return res.status(404).json({'message': "user not found"});
    await user.save();
    return res.json({
      message : `${user.firstName} ${user.lastName} is admin `,
      user
    });
}); 

exports.adminFalse  =  asyncHandler(async(req, res)=>{
  let user = await User.findByIdAndUpdate({_id: req.params.id}, {isAdmin:false})
    if(!user)
      return res.status(404).json({'message': "user not found"});
    await user.save();
    return res.json({
      message : `${user.firstName} ${user.lastName} is user `,
      user
    });
}); 
