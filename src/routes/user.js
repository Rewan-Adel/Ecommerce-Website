const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtr');
const authController = require('../controllers/authCtr');
const {verifyToken, isAdmin} = require('../middlewares/verifyToken');

router.post("/signup",          authController.signup);
router.post("/auth",              authController.login);
router.post("/logout",            authController.logout);
router.patch("/:id", verifyToken, userController.updateOne);
router.get("/:id",   verifyToken, userController.getOne); //get his profile

// @des Admin operations
router.get("/",            verifyToken , isAdmin, userController.getAllUsers);
router.delete("/:id",      verifyToken,  isAdmin, userController.DeleteOne);
router.get("/search/:key", verifyToken,  isAdmin, userController.searchUser);
router.patch("/admin?true",  verifyToken,  isAdmin, userController.adminTrue);
router.patch("/admin?false", verifyToken,  isAdmin, userController.adminFalse);

module.exports = router;
