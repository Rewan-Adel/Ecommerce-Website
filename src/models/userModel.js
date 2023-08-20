const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "please, enter your email"],
      //validate: [validator.isEmail(), "please, enter a valid email"]
    },
    password: { type: String, minlength: 4, maxlength: 20, required:[ true , 'please, enter a password']},
    confirmPassword: { type: String, required:[ true, 'Confirm Password'] },
    street: { type: String, required: true },
    city: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    cart : { type : mongoose.Schema.Types.ObjectId, ref: 'carts'},
    wishlist : { type : mongoose.Schema.Types.ObjectId, ref: 'products'}
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
  // Check if user doesn't modify his password.
  if(!this.isModified("password")){
    next();
  };
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method.isPasswordMatch = async(pass)=>{
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("users", userSchema);
