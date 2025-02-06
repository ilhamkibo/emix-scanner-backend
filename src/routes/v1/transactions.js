const express = require("express");
const { sequelize } = require("../../models");
const Transactions = sequelize.models.Transactions;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Transactions.findAll();
    const transactions = response.map((transaction) => transaction.toJSON());
    res.send(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/101", (req, res) => {
  res.send("This is transaction 101 route!");
});

router.get("/102", (req, res) => {
  res.send("This is transaction 102 route!");
});

module.exports = router;
