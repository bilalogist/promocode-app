import express from "express";
import userRules from "../app/validations/userRules.js";
import validator from "../app/validations/validator.js";
import promoCodeController from "../app/controllers/promoCodeController.js";

const router = express.Router();
// This route creates a promo code for the specified user id
router.get(
  "/generate",
  userRules.checkUserId(),
  validator,
  promoCodeController.generatePromoCode
);

// This route returns user for the specified promoCode
router.get("/:promoCode", promoCodeController.getPromoCodeInfo);

export default router;
