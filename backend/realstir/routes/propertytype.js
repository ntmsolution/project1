const propertytype = require("../controllers/propertytype.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addpropertytype", propertytype.addpropertytype);
router.get("/getpropertytype", propertytype.getpropertytype);
router.post("/mpropertytypedelete", propertytype.mpropertytypedelete);
router.post("/spropertytypedelete", propertytype.spropertytypedelete);
router.post("/propertytypedetail", propertytype.propertytypedetail);
router.post("/edit_propertytype", propertytype.edit_propertytype);

module.exports = router;