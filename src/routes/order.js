const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCtr');
const {verifyToken, isAdmin} = require('../middlewares/verifyToken');

// router.post("/", controller.addOrder)
router.get("/:id",   verifyToken,   controller.get_order_ById);
router.patch("/:id",  verifyToken,  controller.update_order_ById);
router.delete("/:id", verifyToken,  controller.delete_order);

router.get("/",      verifyToken, isAdmin,  controller.get_all_orders);
module.exports = router;