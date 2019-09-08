const models = require("./sequelize-define");

module.exports = () => {
  const options = {
    // TEST 모드 일 때만 DB를 초기화 하는 코드
    force: process.env.NODE_ENV === "test" ? true : false
  };
  return models.sequelize.sync(options);
};
