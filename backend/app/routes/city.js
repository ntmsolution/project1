const City = require("../controllers/city.js");
const express = require("express");

const router = express.Router();

router.post("/addcity", City.addcity);
router.get("/allcity", City.allcity);
router.delete("/citydelete", City.citydelete);

module.exports = router;