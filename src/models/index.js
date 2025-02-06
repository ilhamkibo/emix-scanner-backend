// models/index.js
"use strict";

const fs = require("fs");
const path = require("path");
const sequelize = require("../config/database"); // Gunakan koneksi dari database.js
const basename = path.basename(__filename);
const db = {};

// Load semua file model
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      sequelize.Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Hubungkan asosiasi model
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

module.exports = db;
