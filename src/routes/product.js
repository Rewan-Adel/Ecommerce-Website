const express = require('express')
const router = express.Router()
const controller = require('../controllers/product')
const validator = require('../middlewares/product')
const upload = require('../util/multer')
const verfiyAdminToken = require('../verifyToken')

router.post("/",    verfiyAdminToken, upload.single('avatar'), controller.addProduct)
router.get("/",     verfiyAdminToken, controller.get_all_products)
router.get("/:id",  verfiyAdminToken, controller.get_product_ById)
router.patch("/:id",verfiyAdminToken, validator, controller.update_product_ById)
router.delete("/:id",verfiyAdminToken, controller.deleteProduct)

module.exports = router