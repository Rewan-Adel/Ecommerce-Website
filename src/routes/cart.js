const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartCtr');
const {verifyToken, isAdmin} = require('../util/token');

router.post("/",       controller.addToCart);
router.get("/:id",   verifyToken,  controller.get_cart_ById);
router.patch("/:id", verifyToken,  controller.update_cart_ById);
router.delete("/:id",verifyToken,  controller.delete_cart);

router.get("/",  verifyToken, isAdmin, controller.get_all_carts);
module.exports = router;