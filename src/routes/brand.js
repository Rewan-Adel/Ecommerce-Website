const express = require("express");
const router = express.Router();
const brand = require("../controllers/brand");

router.post("/", brand.addBrand);
router.get("/", brand.get_all_brands);
router.delete("/:id", brand.deleteBrand);

module.exports = router;
