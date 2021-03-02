const state = require("../controllers/state.js");
const express = require("express");

const router = express.Router();

router.post("/addstate", state.addstate);
router.get("/allstate", state.allstate);
router.delete("/statedelete", state.statedelete);

module.exports = router;