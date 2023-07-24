const express = require('express')
const router = express.Router()
const controller = require('../controllers/order')
// const validator = require('../middlewares/order')


router.post("/", controller.addOrder)
router.get("/",  controller.get_all_orders)
router.get("/:id",controller.get_ById)
router.patch("/:id", controller.update_order_ById)
router.delete("/:id", controller.deleteorder)

module.exports = router