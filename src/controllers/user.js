const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");
const generateToken = require('../util/generateToken')
const register = async (req, res) => {
  try {
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Invalid Email",
        "status code": 400,
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({
        message: "User already exists",
        id: user._id,
        token: user.token,
      });
    }

    const HashedPass = await bcrypt.hash(req.body.password, 8);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: HashedPass,
      street: req.body.street,
      city: req.body.city,
    });
    await user.save();
    let token = await generateToken(user,res);
    res.json({
      message: `${user.firstName} ${user.lastName} is registered`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      street: user.street,
      city: user.city,
      id: user._id,
      token: token,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.log(err);
  }
};
const auth = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid password or email",
        "status code": 400,
      });
    }
    let validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass || !user) {
      return res.status(400).json({
        message: "Invalid password or email",
        "status code": 400,
      });
    }

    let token =  generateToken(user, res);
    return res.json({
      message: "Logged in successfully",
      // firstName: user.firstName,
      // lastName: user.lastName,
      // email: user.email,
      // street: user.street,
      // city: user.city,
      // id: user._id,
      // isAdmin: user.isAdmin,
      // token: token,
         user, 
         token
    });
  } catch (err) {
    console.log(err);
  }
};
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
const getAll = async (req, res) => {
  try {
    let user = await User.find().select({
      firstName: 1,
      lastName: 1,
      email: 1,
    });
    return res.json({ user });
  } catch (err) {
    console.log(err);
  }
};

const getOne = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        street: user.street,
        city: user.city,
        id: user.id,
        //"token": token,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else
      res.status(400).json({ message: "User Not Found!", "status code": 400 });
  } catch (err) {
    console.log(err);
  }
};

const DeleteOne = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    if (user) {
      res.json({
        message: `${user.fristName} ${user.lastName} is deleted`,
      });
    } else
      res.status(401).json({ message: "User Not Found!", "status code": 401 });
  } catch (err) {
    console.log(err);
  }
};

const updateOne = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Not Found!", "status code": 400 });
    }
    if (!validator.isEmail(req.body.email)) {
      return res.status(400).json({
        message: "Invalid Email",
        "status code": 400,
      });
    }
    return res.json({
      message: `user is updated`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      street: user.street,
      city: user.city,
      id: user._id,
      //"token": token,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};

const search = async (req, res) => {
  try {
    let data = await User.find({
      $or: [
        { firstName: { $regex: req.params.key } },
        { lastName: { $regex: req.params.key } },
        { email: { $regex: req.params.key } },
      ],
    });
    if (data.length > 0) res.json(data);
    res.status(400).json({
      message: "user not found !",
      "status code": 400,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error !" });
  }
};
module.exports = {
  register,
  getAll,
  getOne,
  DeleteOne,
  updateOne,
  logout,
  auth,
  search,
};
