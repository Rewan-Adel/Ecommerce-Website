const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCtr');

router.get("/income",  controller.income);

module.exports = router;const {verifyToken, isAdmin} = require('../util/token');

router.post("/", controller.addOrder)
router.get("/:userId", verifyToken,   controller.get_order_ById);
router.get("/",    controller.get_all_orders);
router.patch("/:id",   verifyToken,  controller.update_order_ById);
router.delete("/:id",  verifyToken,  controller.delete_order);

router.get("/",   verifyToken, isAdmin,  controller.get_all_orders);
router.get("/income",   verifyToken, isAdmin,  controller.income);