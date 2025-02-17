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
      // Recipe berelasi dengan satu Product
      Recipe.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });

      // Recipe berelasi dengan satu Material
      Recipe.belongsTo(models.Materials, {
        foreignKey: "material_id",
        as: "material",
      });
    }
  }
  Recipe.init(
    {
      product_id: DataTypes.INTEGER,
      material_id: DataTypes.INTEGER,
      quantity: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};
