const models = require("../sequelize_sqlite");

module.exports = () => {
  return models.sequelize.sync({ force: true });
};
