/*
 * Router -> Controller -> API Logic
 */

// DB model
const models = require("../../data/sequelize-define");

// # TDD-1 GET
const index = (req, res) => {
  req.query.limit = req.query.limit || 10; // undefined이면 10으로 저장

  const limit = parseInt(req.query.limit, 10); // 10진수로 변환
  if (Number.isNaN(limit)) return res.status(400).end(); // 숫자 형변환에 실패하여 NaN이 들어간 경우 400 리턴

  // SELECT * FROM users;
  models.User.findAll({
    limit: limit
  }).then(users => {
    res.json(users);
  });
};
const show = (req, res) => {
  const p_id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 변환
  if (Number.isNaN(p_id)) return res.status(400).end(); // 숫자열 변환 실패시 NaN이 되므로 400 반환

  // SELECT * FROM users WHERE id = 1;
  models.User.findOne({
    where: { id: p_id }
  }).then(user => {
    // 유저를 찾을 수 없어서 존재하지 않는 경우 404 반환
    if (!user) return res.status(404).end();
    // JSON 형식으로 반환
    res.json(user);
  });
};

// # TDD-2 DELETE
const destroy = (req, res) => {
  const p_id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 반환
  if (Number.isNaN(p_id)) return res.status(400).end(); // 숫자열 변호나 실패시 NaN이 되므로 400 반환

  // DELETE FROM users WHERE id = 1;
  models.User.destroy({
    where: { id: p_id }
  }).then(user => {
    if (!user) return res.status(409).end();
    res.status(204).end();
  });
};

// # TDD-3 POST
const create = (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end(); // Name값이 비어있는 경우 400 리턴

  // INSERT INTO users (`name`) VALUES('daniel')
  models.User.create({ name })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      if (err.name === "SequelizeUniqueConstraintError")
        return res.status(409).end();
      else return res.status(500).end();
    });
};

// # TDD-4 PUT
const update = (req, res) => {
  const id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 반환
  if (Number.isNaN(id)) return res.status(400).end(); // 숫자열 변호나 실패시 NaN이 되므로 400 반환

  const name = req.body.name;
  if (!name) return res.status(400).end(); // Name값이 비어있는 경우 400 리턴

  // SELECT * FROM users WHERE id = 3;
  models.User.findOne({ where: { id: id } }).then(user => {
    if (!user) return res.status(404).end(); // 사용자가 없는 경우 404 리턴

    if (user.name === name) return res.status(409).end(); // 이름이 중복되는 경우 409 리턴

    // UPDATE users SET name = chenn WHERE id = 3
    // 위 WHERE 조건은 findOne에 의해 검증되었다.
    user.name = name;
    user
      .save()
      .then(user => {
        res.json(user); // 사용자가 갱신된 경우 사용자 문자열 리턴
      })
      .catch(err => {
        console.log(err);
        /*
        if (err.name === "SequelizeUniqueConstraintError")
          return res.status(409).end();
        else return res.status(500).end();
        */
      });
  });
};

module.exports = { index, show, destroy, create, update };
