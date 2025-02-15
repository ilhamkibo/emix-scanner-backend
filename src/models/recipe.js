"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init(
    {
      cake_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      quantity: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
