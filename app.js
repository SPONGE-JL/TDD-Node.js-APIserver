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

// 터미널에서 아래 커멘드로 GET 요청을 하면 위 코드 라인에서 응답합니다.
// curl -X GET "127.0.0.1:3000/users"
app.get("/users", (req, res) => {
  res.json(users);
  // Content-Type: application/json; charset=utf-8
  // [{"id":1,"name":"alice"},{"id":2,"name":"burky"},{"id":3,"name":"chris"}]
});

module.exports = app;
