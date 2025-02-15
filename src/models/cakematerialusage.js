"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CakeMaterialUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CakeMaterialUsage.init(
    {
      cake_id: DataTypes.INTEGER,
      pack_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CakeMaterialUsage",
    }
  );
  return CakeMaterialUsage;
};
