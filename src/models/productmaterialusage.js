"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductMaterialUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductMaterialUsage.belongsTo(models.BomList, {
        foreignKey: "bom_id",
        as: "bom",
      });
      ProductMaterialUsage.belongsTo(models.MaterialPack, {
        foreignKey: "pack_id",
        as: "pack",
      });
    }
  }
  ProductMaterialUsage.init(
    {
      bom_id: DataTypes.INTEGER,
      pack_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductMaterialUsage",
    }
  );
  return ProductMaterialUsage;
};
