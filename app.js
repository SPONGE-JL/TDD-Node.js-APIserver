const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");

const rootRouter = require("./routes");
const userRouter = require("./api/user");

const app = express();

// TDD - Test 환경에서는 로그 미들웨어가 나타나지 않음
if (process.env.NODE_ENV !== "test") app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", rootRouter);
app.use("/users", userRouter);

module.exports = app;
