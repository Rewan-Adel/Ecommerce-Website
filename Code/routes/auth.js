const express = require("express");
const router = express.Router();
const validator = require("../middlewares/authMW");
const User = require("../models/user");
const config = require("config");
const bcrypt = require("bcrypt");

router.post("/", validator, async (req, res) => {
  try {
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

    if (!config.get("jwtsec")) {
      console.log("JWT is denied");
      return res.status(500).json({ message: "internal server error" });
    }

    let token = await user.AuthToken();
    res.header("x-auth-token", token);
    return res.json({
      message: "Logged in successfully",
      firstName: user.firstName,
      lasrName: user.lastName,
      email: user.email,
      street: user.street,
      city: user.city,
      id: user._id,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
