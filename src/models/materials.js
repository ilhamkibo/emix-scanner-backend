"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Materials.init(
    {
      name: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      quantity: {
        type: DataTypes.INTEGER,
      },
      code: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Materials",
    }
  );
  return Materials;
};
