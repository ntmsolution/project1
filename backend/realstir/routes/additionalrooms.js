const additionalrooms = require("../controllers/additionalrooms.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addadditionalrooms", additionalrooms.addadditionalrooms);
router.get("/getadditionalrooms", additionalrooms.getadditionalrooms);
router.post("/madditionalroomsdelete", additionalrooms.madditionalroomsdelete);
router.post("/sadditionalroomsdelete", additionalrooms.sadditionalroomsdelete);
router.post("/additionalroomsdetail", additionalrooms.additionalroomsdetail);
router.post("/edit_additionalroomsdetail", additionalrooms.edit_additionalrooms);

module.exports = router;