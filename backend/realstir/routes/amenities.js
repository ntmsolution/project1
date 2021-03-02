const amenities = require("../controllers/amenities.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addamenities", amenities.addamenities);
router.get("/getamenities", amenities.getamenities);
router.post("/mamenitiesdelete", amenities.mamenitiesdelete);
router.post("/samenitiesdelete", amenities.samenitiesdelete);
router.post("/amenitiesdetail", amenities.amenitiesdetail);
router.post("/edit_amenities", amenities.edit_amenities);

module.exports = router;