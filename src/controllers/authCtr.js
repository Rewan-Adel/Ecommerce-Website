const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const validator = require('validator');
const sgMail = require('@sendgrid/mail');
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

//when user enter his/her email to send link
exports.forgotPassword = asyncHandler(async (req, res) => {
  let Email = await validator.isEmail(req.body.email);
  if(!Email) return res.status(400).json({message : "Email is required"});

  Email = req.body.email;
  const user = await User.findOne({email: Email});
  if(!user) return res.status(400).json({message : "Invalid Email"});
  
  let token = jwt.sign({userId: user._id},process.env.JWT_SECRET, {expiresIn:"5m"});
  let link  = `http://localhost:8080/api/user/reset-password/${user._id}/${token}`;
  console.log(link);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    from : process.env.EMAIL_NAME,
    to   : Email,
    subject : "Bazaar",
    text : `Hello\n `+' you can reset your password by clicking the link below:\n' +link
  };
  sgMail.send(msg)
  .then(
      res.json({message: 'password reset link has been set to your email'})
  )
  .catch((err)=> console.log(err));
});

exports.resetEmail = asyncHandler(async (req, res) => {

});

exports.resetPassword  = asyncHandler(async (req, res) => {
});



  
//   let userToken = await User.findByIdAndUpdate(user._id, {verifyToken:token}, {new:true});
//   if(userToken){
//     //const sgMail = require('@sendgrid/mail');
// const nodeMailer = require('nodemailer')
// const smtpTransport = require('nodemailer-smtp-transport')
// require('dotenv').config();

// //sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// // email config
// const transporter = nodeMailer.createTransport({
//     //host: 'smtp.sendgrid.net',
//     service:"gmail",
//     //port : 587,
//     pool: true, // This is the field you need to add
//     auth:{
//         user: "apikey",
//         pass: process.env.SENDGRID_API_KEY
//   }
// }); 
//   const mailOptions = {
//     from : process.env.EMAIL_NAME,
//     to   : 'rewanmahrous7@gmail.com',
//     subject : "Reset Password",
//     text : `the link valid for 2min http:/localhost:8080/ `
//   }
//   await transporter.sendMail(mailOptions, (err, info)=>{
//   if(err) res.status(401).json({message:"email not sent!", err});
//   else res.json({message:"check your email", info});
//   transporter.close();

