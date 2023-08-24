const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const {generateToken} = require('../middlewares/Token'); 

exports.signup = asyncHandler(async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user){ res.status(400).json({message: "User already exists."}); }
    
    user = new User(req.body);
    user.confirmPassword = undefined;
    await user.save();
  
    res.status(200).json({
      message: "Added Successfully",
      user
    });
    const token = await generateToken(user,res);
  
    res.json({
      message: `${user.firstName} ${user.lastName} is registered`, user, token
    });
 
}
);

exports.login = asyncHandler( async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).json({message:'Please provide email and password'});

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

    let token = await  generateToken(user, res);
    user.confirmPassword = undefined;
    return res.json({
      message: "Logged in successfully", user,  token
    }); 
});

exports.logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "logout", {
        httpOnly: true,
        expires: new Date(0),
      });
      res.json({ message: "Logged out successfully" });
  });

exports.forgotPassword = asyncHandler(async (req, res) => {});
exports.resetPassword  = asyncHandler(async (req, res) => {});
