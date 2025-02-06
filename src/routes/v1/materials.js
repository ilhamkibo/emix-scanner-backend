const express = require("express");
const { sequelize } = require("../../models");
const Materials = sequelize.models.Materials;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Materials.findAll();
    const materials = response.map((material) => material.toJSON());
    res.send(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/101", (req, res) => {
  res.send("This is material 101 route!");
});

router.get("/102", (req, res) => {
  res.send("This is material 102 route!");
});

module.exports = router;
