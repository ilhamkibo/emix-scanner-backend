const express = require("express");
const { sequelize } = require("../../models");
const MaterialPack = sequelize.models.MaterialPack;

const router = express.Router();

router.get("/:packCode", async (req, res) => {
  try {
    const { packCode } = req.params;
    const response = await MaterialPack.findOne({
      where: { pack_code: packCode },
      include: [
        {
          model: sequelize.models.MaterialBatch,
          as: "batch",
          include: ["material"],
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ error: "Pack code not found" });
    }

    res.json(response);
  } catch (error) {
    console.error("Error fetching pack code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { batch_id, pack_code, quantity } = req.body;

    if (!batch_id || !pack_code || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const data = await MaterialPack.create({
      batch_id,
      pack_code,
      quantity,
      isUsed: false,
    });

    if (!data) {
      return res.status(500).json({ error: "Failed to insert pack code" });
    }

    res.status(200).json({ message: "Pack code inserted successfully", data });
  } catch (error) {
    console.error("Error generating barcode:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const response = await MaterialPack.findAll({
      limit: limit,
      include: [
        {
          model: sequelize.models.MaterialBatch,
          as: "batch",
          include: ["material"],
        },
      ],
    });

    if (!response) {
      return res.status(404).json({ error: "Pack code not found" });
    }

    const packs = response.map((pack) => pack.toJSON());
    return res.status(200).send(packs);
  } catch (error) {
    console.error("Error fetching packs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
