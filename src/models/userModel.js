const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const asyncHandler = require('express-async-handler');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please, enter your email"],
      validate(val){
        if(! validator.isEmail(val)) throw new Error('Email is invalid');
       }
    },
    password: { type: String, min: 4, max: 20, trim : true ,required:[ true , 'please, enter a password']},
    confirmPassword: { type: String },
    mobile :{ type:String, max: 11, min:11 }, 
    city: { type: String, required: true },
    street: { type: String },
    
    isAdmin: { type: Boolean, default: false },
    cart :   { type : mongoose.Schema.Types.ObjectId, ref: 'carts'},
    wishlist:
    [
      { type : mongoose.Schema.Types.ObjectId, ref: 'Products'}
    ],

    resetToken: { type: String },
    resetTokenExpires:{type: Date} 
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
  // Check if user doesn't modify his password.
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  };
  next();
});


// userSchema.methods.isPasswordMatch = async(pass)=>{
//   return await bcrypt.compare(pass, this.password);
// };

userSchema.methods.generateToken = asyncHandler(async function(user){
  const token = jwt.sign({ 
    userId : user._id,
    isAdmin : user.isAdmin },
    process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
});


module.exports = mongoose.model("users", userSchema);
