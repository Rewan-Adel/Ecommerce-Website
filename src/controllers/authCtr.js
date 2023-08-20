const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');

const generateToken = (user, res)=>{
    const token = jwt.sign({ 
      userId : user._id,
      isAdmin : user.isAdmin },
      process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    return token;
};
 
exports.signup = asyncHandler(async(req, res) => {
 
    let user = new User(req.body);
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
