const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

require("dotenv").config()

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
module.exports = {verifyToken, isAdmin};