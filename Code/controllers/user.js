const User = require("../models/user");
const bcrypt = require("bcrypt");
const config = require("config");
const validator = require("validator");

const getAll = async (req, res) => {
  try {
    let users = await User.find().select({
      firstName: 1,
      lastName: 1,
      email: 1,
      isAdmin: 1,
    });
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const addNew = async (req, res) => {
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
      isAdmin: req.body.isAdmin,
    });
    await user.save();
    if (!config.get("jwtsec")) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
    let token = await user.AuthToken();
    res.header("x-auth-token", token);
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
const getOne = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (user) {
      if (!config.get("jwtsec")) {
        console.log("jwt is denied");
        return res
          .status(500)
          .json({ message: "Internal Server Error!", "status code": 500 });
      }
      const token = await user.AuthToken();
      res.header("x-auth-token", token);
      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        street: user.street,
        city: user.city,
        id: user.id,
        token: token,
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
    if (user) {
      res.json({
        message: `${user.firstName} ${user.lastName} is deleted`,
      });
    } else
      res.status(401).json({ message: "User Not Found!", "status code": 401 });
  } catch (err) {
    console.log(err);
  }
};

const updateOne = async (req, res) => {
  console.log(req.body);

  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.street = req.body.street || user.street;
    user.city = req.body.city || user.city;
  } else {
    return res
      .status(400)
      .json({ message: "User Not Found!", "status code": 400 });
  }

  try {
    const updatedUser = await user.save();
    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ message: "User Not Found!", "status code": 400 });
    // }
    // if (!config.get("jwtsec")) {
    //   console.log("jwt is denied");
    //   return res.status(500).json({ message: "Internal server error!" });
    // }
    // const token = await user.AuthToken();
    // res.header("x-auth-token", token);
    return res.json({
      message: `user is updated`,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      street: updatedUser.street,
      city: updatedUser.city,
      id: updatedUser._id,
      // token: token,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt,
    });
  } catch (err) {
    console.log(err);
  }
};
const stats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = date.getFullYear(date.getFullYea() - 1);
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error!" });
  }
};
module.exports = { addNew, getAll, getOne, DeleteOne, updateOne, stats };
