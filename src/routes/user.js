const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtr');
const authController = require('../controllers/authCtr');
const {verifyToken, isAdmin} = require('../util/token');

router.post("/signup", authController.signup);
router.post("/login",  authController.login );
router.get("/logout",  authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router
    .route("/reset-password/:id/:token")
    .get()
    .post(authController.resetPassword);

    
router
    .route("/:id")
    .patch(userController.updateOne)
    .get(verifyToken, userController.getOne);

// @des Admin operations
router.get("/",             verifyToken,  isAdmin, userController.getAllUsers);
router.delete("/:id",       verifyToken,  isAdmin, userController.DeleteOne);
router.get("/search/:key",       verifyToken,  isAdmin, userController.searchUser);
router.patch("/admin?true/:id",  verifyToken,  isAdmin, userController.adminTrue);
router.patch("/admin?false/:id", verifyToken,  isAdmin, userController.adminFalse);

module.exports = router;
