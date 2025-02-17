const express = require("express");
const { sequelize } = require("../../models");
const Users = sequelize.models.Users;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Users.findAll();
    const users = response.map((user) => user.toJSON());
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`This is user ${userId} route!`);
});

router.get("/102", (req, res) => {
  res.send("This is user 102 route!");
});

module.exports = router;
