var express = require("express");
var router = express.Router();

const validator = require("../app/validations/validator");
const userRules = require("../app/validations/userRules");
const userController = require("../app/controllers/userController");

router.post("/", userRules.addUser(), validator, userController.addUser);

router.get("/", userRules.checkUserId(), validator, userController.getUser);

router.put("/", userController.updateUser);

router.delete(
  "/",
  userRules.deleteUser(),
  validator,
  userController.deleteUser
);

module.exports = router;
