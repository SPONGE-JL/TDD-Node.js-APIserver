const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// 첫 API 만들기 : 아래 정보는 추후 DB에서 가져오는 정보로 대체될 예정입니다.
let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "burky" },
  { id: 3, name: "chris" }
];

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);

// # TDD-1 GET
app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10; // undefined이면 10으로 저장
  const limit = parseInt(req.query.limit, 10); // 10진수로 변환
  // 숫자 형변환에 실패하여 NaN이 들어간 경우 400 리턴
  if (Number.isNaN(limit)) return res.status(400).end();

  res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const p_id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 변환
  if (Number.isNaN(p_id)) return res.status(400).end(); // 숫자열 변환 실패시 NaN이 되므로 400 반환
  const f_user = users.filter(user => user.id === p_id)[0]; // 숫자값에 해당하는 배열을 추출
  if (!f_user) return res.status(404).end(); // 유저를 찾을 수 없어서 존재하지 않는 경우 404 반환
  res.json(f_user); // JSON 형식으로 반환
});

// # TDD-2 DELETE
app.delete("/users/:id", (req, res) => {
  const p_id = parseInt(req.params.id, 10); // 문자열 id를 숫자열로 반환
  if (Number.isNaN(p_id)) return res.status(400).end(); // 숫자열 변호나 실패시 NaN이 되므로 400 반환
  users = users.filter(user => user.id !== p_id);
  res.status(204).end();
});

// # TDD-3 POST
app.post("/users", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end(); // Name값이 비어있는 경우 400 리턴
  const conflicLength = users.filter(user => user.name === name).length;
  if (conflicLength) return res.status(409).end(); // 중복된 경우 409 리턴
  const id = Date.now();
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

module.exports = app;
