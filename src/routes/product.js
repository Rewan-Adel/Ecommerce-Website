const express = require('express')
const router = express.Router()
const controller = require('../controllers/productCtr')
const {verifyToken, isAdmin} = require('../util/token');

router.get("/",            controller.get_all_products);
router.get("/:id",         controller.get_product_ById);

router.get("/search/query?",  controller.filter);

router.use(verifyToken);    

router.post("/:id/review",controller.createProductReview);

router.use(isAdmin);    

//@desc Admin Ops
router.post("/",      controller.addProduct);
router.patch("/:id",  controller.update_product_ById);
router.delete("/:id", controller.deleteProduct);

module.exports = router ;
