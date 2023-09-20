const express = require("express");
const router = express.Router();
const {verifyToken, isAdmin} = require('../util/token');
const categoryController = require("../controllers/categoryCtr");

router.get("/",     categoryController.get_all_categories);


router.use(verifyToken);    
router.use(isAdmin);    

router.post("/",       categoryController.add_category);
router.delete("/:id",  categoryController.delete_category);
router.patch("/:id",   categoryController.update_category_ById);

module.exports = router;
