const express = require("express");
const userRoute = require("./users.js");
const productRoute = require("./products.js");
const transactionRoute = require("./transactions.js");
const materialRoute = require("./materials.js");

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/transactions", transactionRoute);
router.use("/materials", materialRoute);

module.exports = router;
