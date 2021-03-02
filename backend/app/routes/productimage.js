// Filename : mediavanue.js

const express = require("express");
const router = express.Router();
const productimage = require("../controllers/productimage.js");
const fileUpload = require('express-fileupload');
// default options
router.use(fileUpload());

router.post("/addproductimage", productimage.addproductimage);
router.get("/allproductimage", productimage.allproductimage);
router.delete("/productimagedelete", productimage.productimagedelete);
/*
router.get("/:filename", productimage.imagepath);
*/


module.exports = router;































