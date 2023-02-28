const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const apiResponse = require("./app/helpers/apiResponse");
const usersRouter = require("./routes/users");
const promoCodeRouter = require("./routes/promoCode");

global["apiResponse"] = apiResponse;
const app = express();

// DB Connection
mongoose
  .connect(`${process.env.MONGO_ADDRESS}/${process.env.MONGO_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log("Coulnt connect mongodb"));

app.use(express.json());

app.use("/user", usersRouter);
app.use("/promo-code", promoCodeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
