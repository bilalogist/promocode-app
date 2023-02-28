var express = require("express");
var router = express.Router();

const userRules = require("../app/validations/userRules");
const validator = require("../app/validations/validator");
const promoCodeController = require("../app/controllers/promoCodeController");

// This route creates a promo code for the specified user id
router.get(
  "/generate",
  userRules.checkUserId(),
  validator,
  promoCodeController.generatePromoCode
);

// This route returns user for the specified promoCode
router.get("/:promoCode", promoCodeController.getPromoCodeInfo);

module.exports = router;
