const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');
router.use(fileUpload());
const additionalfurnishing = require("../controllers/additionalfurnishing.js");

router.post("/addadditionalfurnishing", additionalfurnishing.addadditionalfurnishing);
router.get("/getadditionalfurnishing", additionalfurnishing.getadditionalfurnishinga);
router.post("/madditional_furnishingdelete", additionalfurnishing.madditional_furnishingdelete);
router.post("/sadditional_furnishingdelete", additionalfurnishing.sadditional_furnishingdelete);
router.post("/additionalfurnishingdetail", additionalfurnishing.additionalfurnishingdetail);
router.post("/edit_additionalfurnishing", additionalfurnishing.edit_additionalfurnishing);

module.exports = router;