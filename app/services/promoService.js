const UserSchema = require("../schemas/UsersSchema");
const error = new Error();
const promoService = {
  getPromoInfo: async (code) => {
    const user = await UserSchema.findOne(
      {
        promoCodes: { $in: [code] },
      },
      { __v: 0, password: 0 }
    );
    if (!user) {
      error.message = "Promo Code not connected with any user";
      error.status = "NOT_FOUND";
      throw error;
    } else return user.toObject();
  },
  savePromoCode: async (id, code) => {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      id,
      { $push: { promoCodes: code } },
      { new: true }
    ); // update the user record by pushing the new promo code to its promoCodes array

    console.log(updatedUser);
    return { promotionalCode: code };
  },
  promoCodeExists: async (code) => {
    const user = await UserSchema.findOne({
      promoCodes: { $elemMatch: { $eq: code } },
    }); // search for a user with the promo code in its array
    return !!user;
  },
};

module.exports = promoService;
