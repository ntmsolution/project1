const overlooking = require("../controllers/overlooking.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addoverlooking", overlooking.addoverlooking);
router.get("/getoverlooking", overlooking.getoverlooking);
router.post("/moverlookingdelete", overlooking.moverlookingdelete);
router.post("/soverlookingdelete", overlooking.soverlookingdelete);
router.post("/overlookingdetail", overlooking.overlookingdetail);
router.post("/edit_overlooking", overlooking.edit_overlooking);

module.exports = router;