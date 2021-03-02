// Filename : mediavanue.js

const express = require("express");
const router = express.Router();
const mediavanue = require("../controllers/mediavanue.js");
const fileUpload = require('express-fileupload');
// default options
router.use(fileUpload());

router.post("/addmediavanue", mediavanue.addmediavanue);
router.get("/allmediavanue", mediavanue.allmediavanue);
router.delete("/mediavanuedelete", mediavanue.mediavanuedelete);

module.exports = router;































