const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const validator = require('../middlewares/product')
const auth = require('../middlewares/authorization')

router.post("/", auth, validator, controller.addProduct)
router.get("/", auth, controller.get_all_products)
router.get("/:id",auth, controller.get_product_ById)
router.patch("/:id",auth,validator, controller.update_product_ById)
router.delete("/:id",auth,controller.deleteProduct)

module.exports = router