const express = require("express");
const { sequelize } = require("../../models");
const MaterialBatch = sequelize.models.MaterialBatch;

const router = express.Router();

// router.get("/:batchCode", async (req, res) => {
//   try {
//     const { batchCode } = req.params;

//     // Find the material batch
//     const response = await MaterialBatch.findOne({
//       where: { batch_code: batchCode },
//       include: ["material"],
//     });

//     if (!response) {
//       return res.status(404).json({ error: "Material not found" });
//     }

//     const { id, quantity, total_pack, material } = response;

//     // Check if packs have already been created
//     const existingPacks = await MaterialPack.findAll({
//       where: { batch_id: id },
//     });

//     if (existingPacks) {
//       return res
//         .status(400)
//         .json({ error: "Pack has been created", existingPacks });
//     }

//     // Calculate quantity per pack
//     const packQty = quantity / total_pack;
//     const packs = [];

//     for (let i = 0; i < total_pack; i++) {
//       const packCode = `${batchCode}-P${i + 1}`;
//       const pack = {
//         batch_id: id,
//         pack_code: packCode,
//         quantity: packQty,
//         isUsed: false,
//       };
//       packs.push(pack);
//     }

//     // Insert packs into the database
//     await MaterialPack.bulkCreate(packs);

//     res.status(200).json({
//       message: "Packs generated successfully",
//       packs,
//     });
//   } catch (error) {
//     console.error("Error fetching material:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.get("/:batchCode", async (req, res) => {
  try {
    const { batchCode } = req.params;

    const batch = await MaterialBatch.findOne({
      where: { batch_code: batchCode },
      include: ["material"],
    });

    if (!batch) {
      return res.status(404).json({ error: "Batch not found" });
    }

    res.json(batch);
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
