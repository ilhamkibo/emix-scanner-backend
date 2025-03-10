const express = require("express");
const { sequelize } = require("../../models");
const BomList = sequelize.models.BomList;
const BomPack = sequelize.models.BomPack;
const MaterialPack = sequelize.models.MaterialPack;

const router = express.Router();

router.get("/:bomCode", async (req, res) => {
  try {
    const { bomCode } = req.params;

    const bomList = await BomList.findOne({
      where: { bom_code: bomCode },
      include: [
        {
          model: sequelize.models.BomMaterial,
          as: "bommaterial",
          include: ["material"],
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

// router.post("/bom-pack", async (req, res) => {
//   try {
//     const { bom_id, pack_id } = req.body;

//     // Validate request body
//     if (!bom_id || !pack_id) {
//       return res
//         .status(400)
//         .json({ error: "bom_id and pack_id are required." });
//     }

//     // Check if the pack_id exists and is not already used
//     const pack = await MaterialPack.findOne({ where: { pack_id } });
//     if (!pack) {
//       return res.status(404).json({ error: "Pack not found." });
//     }
//     if (pack.isUsed) {
//       return res
//         .status(400)
//         .json({ error: "This pack is already marked as used." });
//     }

//     // Create a new BomPack entry
//     const newPackIdOnBom = await BomPack.create({ bom_id, pack_id });

//     // Update MaterialPack to mark it as used
//     const updatedPack = await MaterialPack.update(
//       { isUsed: true, updatedAt: new Date() },
//       { where: { pack_id } }
//     );

//     // Send response
//     res.status(201).json({
//       message: "Pack added to BOM successfully.",
//       data: newPackIdOnBom,
//     });
//   } catch (error) {
//     console.error("Error creating bom-pack entry:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.post("/bom-pack", async (req, res) => {
  try {
    const { bom_id, packs } = req.body;

    // Validate request body
    if (!bom_id || !Array.isArray(packs) || packs.length === 0) {
      return res
        .status(400)
        .json({ error: "bom_id and an array of packs are required." });
    }

    // Array to store results
    const results = [];
    const errors = [];

    // Iterate through each pack_id
    for (const pack_code of packs) {
      try {
        // Check if the pack_code exists and is not already used
        const pack = await MaterialPack.findOne({
          where: { pack_code: pack_code },
        });
        if (!pack) {
          errors.push({ pack_code, error: "Pack not found." });
          continue;
        }
        if (pack.isUsed) {
          errors.push({
            pack_code,
            error: "This pack is already marked as used.",
          });
          continue;
        }

        // Create a new BomPack entry
        const newPackIdOnBom = await BomPack.create({
          bom_id,
          pack_id: pack.id,
        });

        // Update MaterialPack to mark it as used
        await MaterialPack.update(
          { isUsed: true, updatedAt: new Date() },
          { where: { pack_code: pack_code } }
        );

        // Add success result
        results.push({
          pack_code,
          message: "Pack added to BOM successfully.",
          data: newPackIdOnBom,
        });
      } catch (error) {
        console.error(`Error processing pack_code ${pack_code}:`, error);
        errors.push({ pack_code, error: "Failed to process this pack." });
      }
    }

    // Send response
    if (errors.length > 0 && results.length > 0) {
      // Partial success, send 207 Multi-Status
      res.status(207).json({
        message: "Processing completed with some errors.",
        success: results,
        failed: errors,
      });
    } else if (results.length === 0) {
      // No success, send 204 No Content
      res.status(404).json({ error: "No packs added to BOM.", failed: errors });
    } else {
      // Full success, send 201 Created
      res.status(201).json({
        message: "All packs added to BOM successfully.",
        success: results,
      });
    }
  } catch (error) {
    console.error("Error processing bom-pack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const limit = req.query.limit || 5;
    const response = await BomPack.findAll({
      limit: limit,
    });
    const bomList = response.map((bomPack) => bomPack.toJSON());
    res.send(bomList);
  } catch (error) {
    console.error("Error fetching bom-pack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
