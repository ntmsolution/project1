const users = require("../controllers/users_type.js");
const express = require("express");
const router = express.Router();
const fileUpload = require('express-fileupload');

// default options
router.use(fileUpload());

router.post("/adduser", users.adduser);
router.post("/loginuser", users.loginuser);
router.post("/changepassword", users.changepassword);
router.post("/forget_password", users.forget_password);
router.post("/alluser", users.alluser);
router.post("/userdetail", users.userdetail);
router.put("/userupdate", users.userupdate);
router.delete("/userdelete", users.userdelete);
router.delete("/alluserdelete", users.alluserdelete);
router.post("/userphonenumbervarification", users.userphonenumbervarification);

module.exports = router;