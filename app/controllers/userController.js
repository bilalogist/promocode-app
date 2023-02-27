const apiResponse = require("../helpers/apiResponse");
const userService = require("../services/userService");
const userController = {
  addUser: async (req, res) => {
    try {
      const { password, __v, ...user } = await userService.addUser(req.body);

      apiResponse(res, false, "User created", user);
    } catch (err) {
      apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
    }
  },
  generatePromoCode: async (req, res) => {
    try {
      let code = await userController.generateUniquePromoCode();
      const promoCode = await userService.savePromoCode(req.params.id, code);
      apiResponse(
        res,
        false,
        "Promotional code generated successfully",
        promoCode
      );
    } catch (err) {
      apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
    }
  },

  updateUser: async (req, res) => {
    try {
      const data = req.body;
      const user = await userService.updateUser(data);
      apiResponse(res, false, "User updated", user);
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
  deleteUser: async (req, res) => {
    try {
      if (!req.body.id)
        return apiResponse(
          res,
          true,
          "Please provide user id",
          null,
          "FORBIDDEN"
        );

      const data = req.body;

      const user = await userService.deleteUser(data);
      apiResponse(res, false, "User Deleted", null);
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

  generateRandomCode: () => {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let code = "";
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * characters.length);
      code += characters[index];
    }
    return code;
  },
  generateUniquePromoCode: async () => {
    let promoCode = userController.generateRandomCode();
    while (await userService.promoCodeExists(promoCode)) {
      // keep generating promo codes until we find one that is not present in the database
      promoCode = generateRandomCode();
    }
    return promoCode; // return the unique promo code
  },
};

module.exports = userController;
