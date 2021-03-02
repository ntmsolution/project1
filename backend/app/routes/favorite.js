
const express = require("express");
const fileUpload = require('express-fileupload');
const router = express.Router();
const favorite = require("../controllers/favorite.js");// default options
router.use(fileUpload());

router.post("/addfavorite", favorite.addfavorite);
router.get("/allfavorite", favorite.allfavorite);
router.delete("/favoritedelete", favorite.favoritedelete);

module.exports = router;