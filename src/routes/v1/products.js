const express = require("express");
const { sequelize } = require("../../models");
const Products = sequelize.models.Products;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Logic to fetch products

    const response = await Products.findAll({
      include: [
        {
          model: sequelize.models.Recipe,
          as: "recipes",
          include: [
            {
              model: sequelize.models.Materials,
              as: "material",
            },
          ],
        },
      ],
    });
    const products = response.map((product) => product.toJSON());

    // Send response
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/101", (req, res) => {
  res.send("This is product 101 route!");
});

router.get("/102", (req, res) => {
  res.send("This is product 102 route!");
});

module.exports = router;
