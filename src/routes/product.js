const express = require('express')
const router = express.Router()
const controller = require('../controllers/productCtr')
const {verifyToken, isAdmin} = require('../util/token');

router.get("/",            controller.get_all_products);
router.get("/:id",          controller.get_product_ById);
router.patch("/:id/review", verifyToken, controller.createProductReview);

// @desc Search 
// @route POST api/product/search/:key
router.get("/search/:key",        controller.get_product_ByKey);
router.get("/search/name/:key",    controller.get_product_ByName);
router.get("/search/brand/:key",  controller.get_product_ByBrand);
router.get("/search/rating/:key",  controller.get_product_ByRating);
router.get("/search/price/:key",    controller.get_product_ByPrice);
router.get("/search/category/:key" ,controller.get_product_ByCategory);

//@desc Admin Ops
router.post("/",      verifyToken, isAdmin, controller.addProduct);
router.patch("/:id",  verifyToken, isAdmin, controller.update_product_ById);
router.delete("/:id", verifyToken, isAdmin, controller.deleteProduct);

module.exports = router ;
