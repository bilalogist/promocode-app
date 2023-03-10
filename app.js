import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose from "mongoose";
import apiResponse from "./app/helpers/apiResponse.js";
import usersRouter from "./routes/users.js";
import promoCodeRouter from "./routes/promoCode.js";
import dotenv from "dotenv";

dotenv.config();
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

export default app;
