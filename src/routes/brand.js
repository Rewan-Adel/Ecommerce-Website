const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandCtr");
const {verifyToken, isAdmin} = require('../middlewares/token');

router.get("/:key", verifyToken,  brandController.get_brand_ByKey);
router.get("/",     verifyToken, brandController.get_all_brands);

router.post("/",     verifyToken, isAdmin, brandController.add_brand);
router.delete("/:id",verifyToken, isAdmin, brandController.delete_brand);
router.patch("/:id", verifyToken, isAdmin, brandController.update_brand_ById);

module.exports = router;
