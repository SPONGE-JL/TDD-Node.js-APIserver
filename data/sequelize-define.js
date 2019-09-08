// Sequilize Module import
const Sequelize = require("sequelize");
// Sequlize object init
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite"
});

// Sequilze Model define
const User = sequelize.define("User", {
  name: Sequelize.DataTypes.STRING
});

module.exports = { Sequelize, sequelize, User };
