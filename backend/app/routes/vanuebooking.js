
const express = require("express");
const router = express.Router();
const vanuebooking = require("../controllers/vanuebooking.js");
const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/addvanuebooking", vanuebooking.addvanuebooking);
router.post("/allvanuebooking", vanuebooking.allvanuebooking);
router.delete("/vanuebookingydelete", vanuebooking.vanuebookingydelete);

module.exports = router;