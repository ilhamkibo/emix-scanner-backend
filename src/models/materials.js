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
      // Materials memiliki banyak Recipe
      Materials.hasMany(models.Recipe, {
        foreignKey: "material_id",
        as: "recipes",
      });
    }
  }
  Materials.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      unit: {
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
