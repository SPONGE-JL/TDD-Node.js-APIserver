// Sequilize Module import
const Sequelize = require("sequelize");
// Sequlize object init
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/db.sqlite",
  logging: false // 기본값은 console.log 함수와 바인딩되어있음. 생성된 SQL을 보고자하는 경우 삭제
});

// Sequilze Model define
const User = sequelize.define("User", {
  name: {
    unique: true,
    type: Sequelize.DataTypes.STRING
  }
});

module.exports = { Sequelize, sequelize, User };
