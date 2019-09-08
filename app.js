const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

// 첫 API 만들기 : 아래 정보는 추후 DB에서 가져오는 정보로 대체될 예정입니다.
const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "burky" },
  { id: 3, name: "chris" }
];

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// # TDD-1
app.get("/users", (req, res) => {
  req.query.limit = req.query.limit || 10; // undefined이면 10으로 저장
  const limit = parseInt(req.query.limit, 10); // 10진수로 변환
  // 숫자 형변환에 실패하여 NaN이 들어간 경우 400 리턴
  if (Number.isNaN(limit)) return res.status(400).end();

  res.json(users.slice(0, limit));
});

// # TDD-2
app.get("/users/:id", (req, res) => {
  const p_id = parseInt(req.params.id, 10);
  const f_user = users.filter(user => user.id === p_id)[0];
  res.json(f_user);
});

module.exports = app;
