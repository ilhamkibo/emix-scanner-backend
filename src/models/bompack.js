"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BomPack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BomPack.belongsTo(models.BomList, {
        foreignKey: "bom_id",
        as: "bom",
      });
      BomPack.belongsTo(models.MaterialPack, {
        foreignKey: "pack_id",
        as: "pack",
      });
    }
  }
  BomPack.init(
    {
      bom_id: DataTypes.INTEGER,
      pack_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BomPack",
    }
  );
  return BomPack;
};
