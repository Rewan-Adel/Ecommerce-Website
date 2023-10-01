const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const {resetPassEmail} = require('../util/email');
const crypto = require('crypto');
require('dotenv').config();

exports.signup = asyncHandler(async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user){ res.status(400).json({message: "User already exists."}); }
    
    user = new User(req.body);
    const token = await user.generateToken(user);
    await user.save();
    user.confirmPassword = undefined;
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
    
    res.json({
      message: `${user.firstName} is registered`, user, token
    });
 
}
);

exports.login = asyncHandler( async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid password or email",
        "status code": 400,
      });
    }

    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      return res.status(400).json({
        message: "Invalid password or email",
        "status code": 400,
      });
    }

    let token = await  user.generateToken(user);
    res.cookie('jwt', token , {
      httpOnly : true,
      secure: process.env.NODE_ENV != "development",
      sameSite : 'strict',
      maxAge : 7 * 24 * 60 * 60 * 1000 

    })
   user.confirmPassword = undefined;
    return res.json({
      message: "Logged in successfully", user, token}); 
});

exports.logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "logout", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.json({ message: "Logged out successfully" });
  });

exports.forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).json({message : "Invalid Email"});
  
  let token = crypto.randomBytes(4).toString('hex');
  user.resetToken = token;
  user.resetTokenExpires = Date.now()+(45 * 60 * 1000);
  await user.save();
  let link  = `http://${req.headers.host}/api/user/reset-password/${user._id}/${token}`;
   resetPassEmail(link, user.email, res);
});

exports.resetPassword  = asyncHandler(async (req, res) =>{
 let user = await User.findOne({resetToken: req.params.token});
 if(!user)  return res.status(400).json({message: 'token has expired'});
 //if(user.resetTokenExpires > Date.now()) return res.status(400).json({message: 'link has expired'});

//Setup new password
user.password = req.body.password;
user.resetToken = undefined; 
user.resetTokenExpires = undefined;

await user.save();
res.json({message:'password changed'});
});