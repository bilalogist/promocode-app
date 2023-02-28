const UserSchema = require("../schemas/UsersSchema");
const bcrypt = require("bcrypt");
const error = new Error();
const userService = {
  getUser: async (id) => {
    const user = await UserSchema.findById(id);
    return user.toObject();
  },
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

    const user = await UserSchema.findByIdAndUpdate(data.id, payLoad, {
      new: true,
    });
    if (!user) {
      error.message = "USER NOT FOUND";
      error.status = "NOT_FOUND";
      throw error;
    } else return user.toObject();
  },

  deleteUser: async (data) => {
    const user = await UserSchema.findByIdAndDelete(data.id);
    if (!user) {
      error.message = "USER NOT FOUND";
      error.status = "NOT_FOUND";
      throw error;
    } else return user;
  },
};

module.exports = userService;
