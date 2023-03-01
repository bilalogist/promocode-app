import apiResponse from "../helpers/apiResponse.js";
import promoService from "../services/promoService.js";
import userService from "../services/userService.js";
import { Request, Response } from "express";

const promoController = {
  // fetches the user with which the promo code is connected with
  getPromoCodeInfo: async (req: Request, res: Response) => {
    try {
      let { _id, ...user } = await promoService.getPromoInfo(
        req.params.promoCode
      );

      apiResponse(res, false, "", { connectedUser: { id: _id, ...user } });
    } catch (err) {
      apiResponse(
        res,
        true,
        err.message,
        null,
        err.status ?? "INTERNAL_SERVER_ERROR"
      );
    }
  },
  // generates a 5 character promo code and pushed to the specified user promoCodes array
  // in the mongodb
  generatePromoCode: async (req: Request, res: Response) => {
    try {
      let code = await promoController.generateUniquePromoCode();
      const promoCode = await userService.savePromoCode(req.query.id, code);
      apiResponse(
        res,
        false,
        "Promotional code generated successfully",
        promoCode
      );
    } catch (err) {
      apiResponse(
        res,
        true,
        err.message,
        null,
        err.status ?? "INTERNAL_SERVER_ERROR"
      );
    }
  },

  // helper functions //

  // generates a random 5 characters code
  generateRandomCode: () => {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * characters.length);
      code += characters[index];
    }
    return code;
  },

  // this function checks that the generated code is unique i.e not
  // already present in mongodb
  generateUniquePromoCode: async () => {
    let promoCode = promoController.generateRandomCode();
    while (await userService.promoCodeExists(promoCode)) {
      // keep generating promo codes until we find one that is not present in the database
      promoCode = generateRandomCode();
    }
    return promoCode; // return the unique promo code
  },
};

export default promoController;
