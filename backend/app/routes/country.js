const country = require("../controllers/country.js");
const express = require("express");

const router = express.Router();

router.post("/addcountry", country.addcountry);
router.get("/allcountry", country.allcountry);
router.delete("/countrydelete", country.countrydelete);
router.post("/states", country.states);

router.post("/cities", country.cities);

module.exports = router;