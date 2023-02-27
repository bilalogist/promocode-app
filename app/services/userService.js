const UserSchema = require("../schemas/UsersSchema");
const bcrypt = require("bcrypt");

const userService = {
  addUser: async (data) => {
    // hash the password to add in the db
    const hashedPassword = await bcrypt.hash(data.password, 10);

    //  adds the user to mongodb
    const user = await UserSchema.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return user.toObject();
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

  updateUser: async (data) => {
    const payLoad = {};

    if (data.name) payLoad.name = data.name;

    if (data.email) payLoad.email = data.email;

    if (data.password) {
      // hash the password to add in the db
      const hashedPassword = await bcrypt.hash(data.password, 10);
      payLoad.password = hashedPassword;
    }

    return await UserSchema.findByIdAndUpdate(data.id, payLoad, { new: true });
  },

  deleteUser: async (data) => {
    return await UserSchema.findByIdAndDelete(data.id);
  },
};

module.exports = userService;
