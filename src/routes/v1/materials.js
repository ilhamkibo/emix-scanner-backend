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

router.post("/", async (req, res) => {
  try {
    const { name, unit } = req.body;
    const newMaterial = await Materials.create({ name, unit });
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error("Error creating material:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
