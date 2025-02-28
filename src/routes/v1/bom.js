const express = require("express");
const { sequelize } = require("../../models");
const BomList = sequelize.models.BomList;

const router = express.Router();

router.get("/:bomCode", async (req, res) => {
  try {
    const { bomCode } = req.params;

    const bomList = await BomList.findOne({
      where: { bom_code: bomCode },
      include: [
        {
          association: "product",
          include: [{ association: "recipes", include: "material" }],
        },
      ],
    });

    if (!bomList) {
      return res.status(404).json({ error: "Bom not found" });
    }

    res.json(bomList);
  } catch (error) {
    console.error("Error fetching bom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
