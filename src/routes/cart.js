const express = require('express')
const router = express.Router()
const controller = require('../controllers/cart')

router.post("/", controller.addCart)
router.get("/",   controller.get_all_carts)
router.get("/:id", controller.get_ById)
router.patch("/:id", controller.update_cart_ById)
router.delete("/:id",controller.deleteCart)

module.exports = router