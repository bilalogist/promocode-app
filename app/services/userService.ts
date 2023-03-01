import UserSchema from "../schemas/UsersSchema.js";
import bcrypt from "bcrypt";

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

export default userService;
