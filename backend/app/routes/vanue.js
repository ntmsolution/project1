// Filename : vanue.js

const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
const vanue = require("../controllers/vanue.js");
// default options
router.use(fileUpload());

router.post("/addvanue", vanue.addvanue);
router.post("/allvanue", vanue.allvanue);
router.post("/vanuemediadetail", vanue.vanuemediadetail);
router.put("/vanueupdate", vanue.vanueupdate);
router.delete("/vanuedelete", vanue.vanuedelete);

module.exports = router;