import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import usersRouter from "./routes/users.js";
import promoCodeRouter from "./routes/promoCode.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// DB Connection
mongoose.connect(`${process.env.MONGO_ADDRESS}/${process.env.MONGO_DATABASE}`)
    .then(() => console.log("Mongo Connected"))
    .catch((err) => console.log("Coulnt connect mongodb"));

app.use(express.json());

app.use("/user", usersRouter);
app.use("/promo-code", promoCodeRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page

    res.status(500);
    res.render("error");
});

export default app;
