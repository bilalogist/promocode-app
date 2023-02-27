const { validationResult } = require("express-validator");
const validator = (req, res, next) => {
  const errorFormatter = ({ location, msg, param }) => {
    return msg;
  };
  const errors = validationResult(req).formatWith(errorFormatter);

  //   const errors = validationResult(req).mapped();
  console.log(errors);
  if (errors.isEmpty()) return next();
  // return apiResponse(res, true, null, errors, "FORBIDDEN");
  return apiResponse(res, true, null, { errors: errors.mapped() }, "FORBIDDEN");
};

module.exports = validator;
