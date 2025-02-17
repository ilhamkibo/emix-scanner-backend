"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialBatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaterialBatch.belongsTo(models.Materials, {
        foreignKey: "material_id",
        as: "material",
      });

      MaterialBatch.hasMany(models.MaterialPack, {
        foreignKey: "batch_id",
        as: "pack",
      });
    }
  }
  MaterialBatch.init(
    {
      material_id: DataTypes.INTEGER,
      quantity: DataTypes.DECIMAL,
      batch_code: DataTypes.STRING,
      total_pack: DataTypes.INTEGER,
      purchase_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "MaterialBatch",
    }
  );
  return MaterialBatch;
};
