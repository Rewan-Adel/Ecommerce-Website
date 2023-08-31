const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
require('dotenv').config();

exports.signup = asyncHandler(async(req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user){ res.status(400).json({message: "User already exists."}); }
    
    
    user = new User(req.body);
    const token = await user.generateToken();
    user.token = token;
    await user.save();
    user.confirmPassword = undefined;
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, 
      });
    
    res.json({
      message: `${user.firstName} ${user.lastName} is registered`, user
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

    let token = await  generateToken();
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

exports.forgotPassword = asyncHandler(async (req, res) => {
  const Email = req.body.email;
  if(!Email) return res.status(400).json({message: 'Email is required'}) 
  const user = await User.findOne({email: Email});
  if(!user) return res.status(400).json({message : "Invalid Email"});
  
  let token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpires = Date.now()+(45 * 60 * 1000);
  await user.save();

  let link  = `http://${req.headers.host}/reset-password/${user._id}/${token}`;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from : process.env.EMAIL_NAME,
    to   : Email,
    subject : "Bazaar",
    html : `<h2>Hello</h2>
    <p> you can reset your password by clicking the link below:</p>
    <a href='${link}'>Reset Password</a>
   <p>Please note that for added security this link becomes invalid after 45 minutes</p>`
  };
  sgMail.send(msg)
  .then(
      res.json({message: 'password reset link has been set to your email'})
  )
  .catch((err)=> console.log(err));
});

exports.resetPassword  = asyncHandler(async (req, res) =>{
 let user = await User.findOne({resetToken: req.params.token});
 //if(user.resetTokenExpires > Date.now()) return res.status(400).json({message: 'link has expired'});
 
if(req.body.password != req.body.confirmPass) return res.status(400).json({message:"Password does not match"});
const passCompared = await bcrypt.compare(req.body.password, user.password);
if(passCompared) return res.status(400).json({message:"password is not strong enough"});
const pass = await  bcrypt.hash(req.body.password, 10);
//Setup new password
user.password = pass;
user.confirmPassword = undefined;
user.resetToken = undefined; 
user.resetTokenExpires = undefined;
await user.save();
res.json({message:'password changed'}); //redirect to home page
});