var express = require("express");
var router = express.Router();
const userController = require("../app/controllers/userController");
// const userRules = require("../app/validations/userRules");
// const validator = require("../app/validations/validator");
// const userAuth = require("../app/middlewares/userAuth");

// router.get("/verify/:token", userController.verifyUser);
// router.post("/login", userController.loginUser);
router.delete("/", userController.deleteUser);
router.get("/promo-code/:id", userController.generatePromoCode);
// router.post("/", userRules.addUser(), validator, userController.addUser);
router.post("/", userController.addUser);
router.put("/", userController.updateUser);

module.exports = router;
