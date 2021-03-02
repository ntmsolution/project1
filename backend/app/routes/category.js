const Category = require("../controllers/category.js");
const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());
router.post("/addcategory", Category.addcategory);
router.get("/allcategory", Category.allcategory);
router.delete("/categorydelete", Category.categorydelete);

module.exports = router;