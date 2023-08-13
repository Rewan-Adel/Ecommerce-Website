const express = require("express");
const router = express.Router();
const category = require("../controllers/category");

router.post("/", category.addCategory);
router.get("/", category.get_all_categories);
router.delete("/:id", category.deleteCategory);

module.exports = router;
