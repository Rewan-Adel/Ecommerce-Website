const express = require("express");
const router = express.Router();
const controller = require("../controllers/product");
const validator = require("../middlewares/product");
const auth = require("../middlewares/authorization");

router.post("/", controller.addProduct);
router.get("/", controller.get_all_products);
router.get("/category/:id", controller.get_products_by_category);
router.get("/:id", controller.get_product_ById);
router.patch("/:id", controller.update_product_ById);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
