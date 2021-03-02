const properties = require("../controllers/properties.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addproperties", properties.addproperties);
router.get("/getproperties", properties.getproperties);
router.post("/mpropertiesdelete", properties.mpropertiesdelete);
router.post("/spropertiesdelete", properties.spropertiesdelete);
router.post("/propertiesdetail", properties.propertiesdetail);
router.post("/edit_properties", properties.edit_properties);
router.post("/verify_status_update", properties.verify_status_update);
router.post("/mverifystatuschange", properties.mverifystatuschange);
router.post("/munverifystatuschange", properties.munverifystatuschange);

module.exports = router;