const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
require("dotenv").config()

const verifyToken = asyncHandler(async(req, res, nxt)=>{
   const token = await req.cookies.jwt ;
   if(token){
       const decoded = jwt.verify(token , process.env.JWT_SECRET);
       const user = User.findById(decoded?.id);
       req.user = user;
       nxt();
   }
   else res.status(400).json("You are not logged in! Please login for get access'");    
});

const isAdmin = asyncHandler(async(req, res, nxt)=>{
    const token = await  req.cookies.jwt || req.headers.authorization.split[' '][1];
    const decodedPayload =  jwt.verify(token , process.env.JWT_SECRET);
    if( decodedPayload.isAdmin == false )
     return res.status(401).json({ message: "Unauthorized!"}); 
    
     nxt(); 
});

module.exports = {
    verifyToken,
    isAdmin
  };
