const express = require("express");
const userRoute = require("./users.js");
const productRoute = require("./products.js");
const transactionRoute = require("./transactions.js");
const materialRoute = require("./materials.js");
const batchRoute = require("./batch.js");
const packRoute = require("./pack.js");
const bomRoute = require("./bom.js");

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/transactions", transactionRoute);
router.use("/materials", materialRoute);
router.use("/batch", batchRoute);
router.use("/pack", packRoute);
router.use("/bom", bomRoute);

module.exports = router;
