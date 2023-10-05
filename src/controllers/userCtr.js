const User = require('../models/userModel');
const {Product} = require('../models/productModel');
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
      return res.status(404).json({"message": "User not found!"});             
  });

exports.role  =  asyncHandler(async(req, res)=>{
  // const query = req.query.admin;
  const user  = await User.findById(req.params.id);

  if(!user)
    return res.status(404).json({'message': "user not found"});
    let role = user.isAdmin;
    let msg;
    if(role === false){
      await user.updateOne({isAdmin : true});
      msg  = `${user.firstName} ${user.lastName} is admin `;
    }
   else if(role === true){
    await user.updateOne({isAdmin : false})
     msg = `${user.firstName} ${user.lastName} is user `;
   };

  await user.save();
  return res.json({
       message : msg,
      user
    });
}); 

exports.wishlist =  asyncHandler(async(req, res)=>{
 const {_id} = req.user;
 const productId = req.body.productId;

  const user = await User.findById(_id);
  const alreadyAdded =  user.wishlist.find((id)=> id.toString() ==  req.body.productId);

  if(alreadyAdded){
    let user = await User.findByIdAndUpdate(_id,
    { $pull : { wishlist : req.body.productId} },
    { new   : true }
    );
  
    return res.json({message: "removed from wishlist",user});

  }
  else {
    let user = await  User.findByIdAndUpdate( _id,
     { $push : { wishlist : req.body.productId} },
     { new   : true }
     );
    return res.json({message: "Added to wishlist",user});

  }
});

exports.getWishlist =  asyncHandler(async(req, res)=>{
  const {_id} = req.user;
  const user = await User.findById(_id).populate('wishlist').exec();
  return res.json(user);
 });
