const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/authorization");

router.patch("/:id", auth, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { isAdmin: true }
    );
    if (!user) {
      return res
        .status(400)
        .json({ message: "user not found", "status code": 400 });
    }
    return res.json({
      message: `${user.firstName} ${user.lastName} is admin`,
      firstNameme: user.firstNameme,
      lastNameme: user.lastNameme,
      email: user.email,
      street: user.street,
      city: user.city,
      token: user.token,
      adminRole: user.isAdmin,
      id: user.id,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
