"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MaterialPack extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MaterialPack.init(
    {
      batch_id: DataTypes.INTEGER,
      pack_code: DataTypes.STRING,
      quantity: DataTypes.DECIMAL,
      isUsed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "MaterialPack",
    }
  );
  return MaterialPack;
};
