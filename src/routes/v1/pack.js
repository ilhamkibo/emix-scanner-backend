const express = require("express");
const { sequelize } = require("../../models");
const MaterialPack = sequelize.models.MaterialPack;

const router = express.Router();

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

module.exports = router;
