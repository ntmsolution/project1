// Filename : ratting.js

const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
const ratting = require("../controllers/ratting.js");// default options
router.use(fileUpload());

router.post("/addratting", ratting.addratting);
router.get("/allratting", ratting.allratting);

module.exports = router;