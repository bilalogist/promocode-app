import express from "express";
import userRules from "../app/validations/userRules";
import validator from "../app/validations/validator";
import promoCodeController from "../app/controllers/promoCodeController.js";

const router = express.Router();
// This route creates a promo code for the specified user id


// This route returns user for the specified promoCode
router.get("/:promoCode", promoCodeController.getPromoCodeInfo);

export default router;
