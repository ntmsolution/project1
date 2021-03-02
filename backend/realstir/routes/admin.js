const admin = require("../controllers/admin.js");
const express = require("express");
const router = express.Router();

const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/login_user_data", admin.login_user_data);
router.post("/change_password", admin.changepassword);
router.post("/forget_password", admin.forget_password);
router.post("/login_email", admin.loginemail);
router.post("/user_detail", admin.userdetail);
router.post("/user_update", admin.userupdate);

module.exports = router;