const mongoose = require("mongoose");
const validator = require("validator");
const config = require("config");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    password: { type: String, minlength: 4, maxlength: 255, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.AuthToken = function () {
  const token = jwt.sign(
    {
      userID: this._id,
      adminRole: this.isAdmin,
    },
    config.get("jwtsec"),
    { expiresIn: "3d" }
  );
  return token;
};

module.exports = mongoose.model("users", userSchema);
