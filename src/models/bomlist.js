"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BomList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BomList.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
      BomList.hasMany(models.BomMaterial, {
        foreignKey: "bom_id",
        as: "bommaterial",
      });
      BomList.hasMany(models.BomPack, {
        foreignKey: "bom_id",
        as: "bompack",
      });
      BomList.hasMany(models.ProductMaterialUsage, {
        foreignKey: "bom_id",
        as: "productmaterialusage",
      });
    }
  }
  BomList.init(
    {
      bom_code: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BomList",
    }
  );
  return BomList;
};
