const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
require("dotenv").config()

const generateToken = (user, res)=>{
    const token = jwt.sign({ 
      userId : user._id,
      isAdmin : user.isAdmin },
      process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, 
    });
    return token;
};

const refreshToken = (user, res)=>{
    const token = jwt.sign({ 
      userId : user._id,
      isAdmin : user.isAdmin },
      process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    
    res.cookie("refreshToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 3 * 24 * 60 * 60 * 1000, 
    });
    return token;
};




const verifyToken = asyncHandler(async(req, res, nxt)=>{
   const token = await req.cookies.jwt ;
   if(token){
       const decoded = await jwt.verify(token , process.env.JWT_SECRET);
       const user = User.findById(decoded?.id);
       req.user = user;
       nxt();
   }
   else res.status(401).json("You are not logged in! Please login for get access'");    
});


const isAdmin = asyncHandler(async(req, res, nxt)=>{
    const user = await User.findOne(req.user);
    if(! user.isAdmin == true) return res.status(401).json({  
        "message": "Unauthorized!"}); 
    else nxt(); 
});

module.exports = {
    generateToken,
    verifyToken,
    isAdmin,
    refreshToken};