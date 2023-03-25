const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const cors = require("cors");
const cors_instance = require("./utils/cors");
const token = require("./utils/token");

const authRouter = require('./routes/auth/auth')
const dataRouter = require('./routes/data/data')
const routerRouter = require('./routes/router/router')

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors(cors_instance.getCorsOptions()));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const url = req.url;
  const whiteList = ["/api/auth/login", "/api/auth/addUser", "/api/router/getAsyncRoutes", "/api/data/getData", "/api/data/deletePatientByPid"];
  if (whiteList.includes(url)) {
    return next();
  } else {
    const t = req.headers.authorization;
    const username = req.headers.username;
    try {
      if (!(await token.verify(t, username))) {
        res.json({ code: 200, message: "token验证失败" });
      } else {
        return next();
      }
    } catch (err) {
      const error = Object.assign({}, err, { status: 401 });
      res.status(401).json(error);
    }
  }
});

app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);
app.use('/api/router', routerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
