const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.js");

router.post("/addcart", cart.addcart);
router.post("/allcart", cart.allcart);
router.put("/cartupdate", cart.cartupdate);
router.delete("/cartdelete", cart.cartdelete);

module.exports = router;































