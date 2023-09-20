const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandCtr");
const {verifyToken, isAdmin} = require('../util/token');

// router.get("/:key",  brandController.get_brand_ByKey);
router.get("/",      brandController.get_all_brands);
router.use(verifyToken);    
router.use(isAdmin);    

router.post("/",     brandController.add_brand);
router.delete("/:id", brandController.delete_brand);
router.patch("/:id", brandController.update_brand_ById);

module.exports = router;
