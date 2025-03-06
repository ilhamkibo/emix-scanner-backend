"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BomMaterial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BomMaterial.belongsTo(models.BomList, {
        foreignKey: "bom_id",
        as: "bom",
      });
      BomMaterial.belongsTo(models.Materials, {
        foreignKey: "material_id",
        as: "material",
      });
    }
  }
  BomMaterial.init(
    {
      bom_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      required_qty: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "BomMaterial",
    }
  );
  return BomMaterial;
};
