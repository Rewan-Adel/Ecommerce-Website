const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartCtr');
const {verifyToken, isAdmin} = require('../util/token');

router.use(verifyToken);
router.post("/",       controller.addToCart);
router.get("/:id",     controller.get_cart_ById);
router.patch("/:id",   controller.update_cart_ById);
router.post("/:id",  controller.deleteOneItem);

router.use(isAdmin);
router.get("/", controller.get_all_carts);
module.exports = router;