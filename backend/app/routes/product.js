
const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
const product = require("../controllers/product.js");
// default options
router.use(fileUpload());

router.post("/addproduct", product.addproduct);
router.post("/allproduct", product.allproduct);
router.post("/productdetail", product.productdetail);
router.put("/productupdate", product.productupdate);
router.delete("/productdelete", product.productdelete);

module.exports = router;