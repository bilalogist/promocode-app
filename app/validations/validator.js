const { validationResult } = require("express-validator");

// middleware to validate the request against the errors

const validator = (req, res, next) => {
  const errorFormatter = ({ location, msg, param }) => {
    return msg;
  };
  const errors = validationResult(req).formatWith(errorFormatter);

  if (errors.isEmpty()) return next();
  return apiResponse(res, true, null, { errors: errors.mapped() }, "FORBIDDEN");
};

module.exports = validator;
