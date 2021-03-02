const user = require("../controllers/user.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.get("/getuserdata", user.getuserdata);
router.post("/muserdelete", user.muserdelete);
router.post("/suserdelete", user.suserdelete);
router.post("/approve_status_update", user.approve_status_update);
router.post("/mauserstatuschange", user.mauserstatuschange);
router.post("/mduserstatuschange", user.mduserstatuschange);

module.exports = router;