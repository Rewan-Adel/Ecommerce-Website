const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCtr');
const {verifyToken, isAdmin} = require('../middlewares/token');

// router.post("/create-checkout-session", controller.addOrder)
router.get("/:userId", verifyToken,   controller.get_order_ById);
router.patch("/:id",   verifyToken,  controller.update_order_ById);
router.delete("/:id",  verifyToken,  controller.delete_order);

router.get("/",   verifyToken, isAdmin,  controller.get_all_orders);
// router.get("/income",   verifyToken, isAdmin,  controller.income);

module.exports = router;