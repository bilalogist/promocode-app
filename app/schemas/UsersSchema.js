import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    requried: true,
    type: String,
  },
  promoCodes: {
    type: [String],
  },
});

export default model("Users", UserSchema);
