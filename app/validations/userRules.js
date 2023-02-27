const { body } = require("express-validator");
const UserSchema = require("../schemas/UsersSchema");
const userValidations = {
  addUser: () => {
    return [
      body("name")
        .isLength({ min: 2, max: 25 })
        .withMessage("Name length should be within 2-25 characters"),
      body("email")
        .toLowerCase()
        .trim()
        .isEmail()
        // .withMessage("Please provide valid email")
        .custom(async (email) => {
          //  checks if the username already exists in the database
          const resp = await UserSchema.findOne({ email: email });
          if (resp) throw new Error("Email already exists");
        }),
      ,
      body("password")
        .isStrongPassword()
        .withMessage(
          "Password must be combination of uppercase , lowercase, numbers and special characters"
        ),
    ];
  },

  //   updateUser: () => {
  //     return [
  //       body("id").withMessage("Please provide user id"),
  //       body("username")
  //         .trim()
  //         .toLowerCase()
  //         .isLength({ min: 3, max: 12 })
  //         .custom(async (username) => {
  //           //  checks if the username already exists in the database
  //           const resp = await UserSchema.findOne({ email: email });
  //           if (resp) throw new Error("Username already exists");
  //         }),
  //       body("email")
  //         .optional()
  //         .trim()
  //         .toLowerCase()
  //         .isEmail()
  //         .withMessage("Please provide valid email"),
  //       body("photoURL")
  //         .optional()
  //         .isURL()
  //         .withMessage("Please provide a valid photoURL")
  //         .optional(),
  //       body("phn")
  //         .optional()
  //         .isMobilePhone()
  //         .withMessage("Please provide a valid phn number"),
  //       body("password")
  //         .optional()
  //         .isStrongPassword()
  //         .withMessage(
  //           "Password must be combination of uppercase , lowercase, numbers and special characters"
  //         ),
  //     ];
  //   },

  //   deleteUser: () => {
  //     return [
  //       body("username")
  //         .optional()
  //         .trim()
  //         .toLowerCase()
  //         .withMessage("Please provide valid username"),
  //       body("id").optional().trim().withMessage("Please provide valid id"),
  //     ];
  //   },
};
module.exports = userValidations;
