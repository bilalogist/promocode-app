import UserSchema from "../schemas/UsersSchema.js";
import bcrypt from "bcrypt";
import {CustomError} from "../helpers/customTypes";

const error: CustomError = new Error();

interface IUserUpdateType {
    id?: string;
    email?: string;
    password?: string;
    promoCode?: string;
}

interface IUserAddType {
    email: string;
    password: string;
    promoCode: string;
}


const userService = {
    getUser: async (id: string) => {
        const user = await UserSchema.findById(id);
        if (user)
            return user.toObject();
        else return null;
    },
    addUser: async (data: IUserAddType) => {
        // hash the password to add in the db
        const hashedPassword = await bcrypt.hash(data.password, 10);

        //  adds the user to mongodb
        const user = await UserSchema.create({
            email: data.email,
            password: hashedPassword,
            promoCode: data.promoCode,
        });

        return user.toObject();
    },

    updateUser: async (data: IUserUpdateType) => {
        const payLoad: IUserUpdateType = {};

        if (data.email) payLoad.email = data.email;

        if (data.password) {
            // hash the password to add in the db
            payLoad.password = await bcrypt.hash(data.password, 10);
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

    deleteUser: async ({id}: { id: string }) => {
        const user = await UserSchema.findByIdAndDelete(id);
        if (!user) {
            error.message = "USER NOT FOUND";
            error.status = "NOT_FOUND";
            throw error;
        } else return user;
    },
    getPromoInfo: async (code: string) => {
        const user = await UserSchema.findOne(
            {
                promoCode: code,
            },
            {__v: 0, password: 0}
        );
        if (!user) {
            error.message = "Promo Code not connected with any user";
            // error.status = "NOT_FOUND";
            throw error;
        } else return user.toObject();
    },

    promoCodeExists: async (code: string) => {
        const user = await UserSchema.findOne({
            promoCode: code
        }); // search for a user with the promo code
        return !!user;
    },
};

export default userService;
