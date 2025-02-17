const express = require("express");
const { sequelize } = require("../../models");
const Recipe = sequelize.models.Recipe;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Recipe.findAll();
    const recipes = response.map((recipe) => recipe.toJSON());
    res.send(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const response = await Recipe.findByPk(req.params.id, {
      include: ["product", "material"],
    });
    const recipe = response.toJSON();
    res.send(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
