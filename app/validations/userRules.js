const { body, query } = require("express-validator");
const UserSchema = require("../schemas/UsersSchema");
module.exports = {
  addUser: () => {
    return [
      body("name")
        .notEmpty()
        .withMessage("Name is required")
        .isLength({ min: 2, max: 25 })
        .withMessage("Name length should be within 2-25 characters"),
      body("email")
        .notEmpty()
        .withMessage("Email is required")
        .toLowerCase()
        .trim()
        .isEmail()
        .withMessage("Please provide valid email")
        .custom(async (email) => {
          //  checks if the username already exists in the database
          const resp = await UserSchema.findOne({ email: email });
          if (resp) throw new Error("Email already exists");
        }),
      body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 14 })
        .withMessage("Password length should be within 6-14 characters"),
    ];
  },
  updateUser: () => {
    return [
      body("id")
        .notEmpty()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("Invalid id")
        .custom(async (id) => {
          //  checks if the username exists in the database
          const resp = await UserSchema.findById(id);
          if (!resp) throw new Error("User not found");
        }),
      body("name")
        .isLength({ min: 2, max: 25 })
        .withMessage("Name length should be within 2-25 characters"),
      body("email")
        .toLowerCase()
        .trim()
        .isEmail()
        .withMessage("Please provide valid email")
        .custom(async (email) => {
          //  checks if the username already exists in the database
          const resp = await UserSchema.findOne({ email: email });
          if (resp) throw new Error("Email already exists");
        }),
      body("password")
        .isLength({ min: 6, max: 14 })
        .withMessage("Password length should be within 6-14 characters"),
    ];
  },
  deleteUser: () => {
    return [
      body("id")
        .notEmpty()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("Invalid id")
        .custom(async (id) => {
          //  checks if the username exists in the database
          const resp = await UserSchema.findById(id);
          if (!resp) throw new Error("User not found");
        }),
    ];
  },
  checkUserId: () => {
    return [
      query("id")
        .notEmpty()
        .withMessage("id is required")
        .isMongoId()
        .withMessage("Invalid id")
        .custom(async (id) => {
          //  checks if the username exists in the database
          const resp = await UserSchema.findById(id);
          if (!resp) throw new Error("User not found");
        }),
    ];
  },
};
