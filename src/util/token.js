const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
require("dotenv").config()

const verifyToken = asyncHandler(async(req, res, nxt)=>{
   const token = await req.cookies.jwt ;
   if(token){
    try{
       const decoded = jwt.verify(token , process.env.JWT_SECRET);
       const user = await User.findById(decoded?.userId);
       req.user = user;
    //    console.log(req.user)
       nxt();
   }catch(err){
    res.status(403).send({
        success:false,
        message: err
       })
    }
}
   else res.status(400).json({message:"You are not logged in! Please login for get access'"});
});

const isAdmin = asyncHandler(async(req, res, nxt)=>{
    const token = await  req.cookies.jwt ;
    const decodedPayload =  jwt.verify(token , process.env.JWT_SECRET);
    if( decodedPayload.isAdmin == false )
     return res.status(401).json({ message: "Unauthorized!"}); 
    
     nxt(); 
});

module.exports = {
    verifyToken,
    isAdmin
  };
