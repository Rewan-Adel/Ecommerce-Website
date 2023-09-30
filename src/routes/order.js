const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderCtr');
const {verifyToken, isAdmin} = require('../util/token');

router.use(verifyToken);

router.post("/",        controller.addOrder);
router.get("/:userId", controller.get_order_ById);
router.patch("/:id",    controller.update_order_ById);
router.delete("/:id",    controller.delete_order);

router.use(isAdmin);

router.get("/",    controller.get_all_orders);
router.get("/income",     controller.income);

module.exports = router;
