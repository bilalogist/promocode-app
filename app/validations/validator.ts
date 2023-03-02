import {validationResult, ValidationError} from "express-validator";
import {Request, Response, NextFunction} from "express";
import apiResponse from "../helpers/apiResponse.js";
// middleware to validate the request against the errors

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errorFormatter = ({location, msg, param}: ValidationError) => {
        return msg;
    };
    const errors = validationResult(req).formatWith(errorFormatter);

    if (errors.isEmpty()) return next();
    return apiResponse(res, true, null, {errors: errors.mapped()}, "FORBIDDEN");
};

export default validator;
