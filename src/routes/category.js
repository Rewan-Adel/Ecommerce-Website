const express = require("express");
const router = express.Router();
const {verifyToken, isAdmin} = require('../middlewares/verifyToken');

router.get("/:key", verifyToken,  categoryController.get_category_ByKey);
router.get("/",     verifyToken, categoryController.get_all_categories);

router.post("/",      verifyToken, isAdmin,  categoryController.add_category);
router.delete("/:id", verifyToken, isAdmin, categoryController.delete_category);
router.patch("/:id",  verifyToken, isAdmin, categoryController.update_category_ById);

module.exports = router;
