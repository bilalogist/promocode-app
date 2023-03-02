import {Schema, model} from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    promoCode: {
        type: String,
    },
});

export default model("Users", UserSchema);
