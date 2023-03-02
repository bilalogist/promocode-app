import {body, query} from "express-validator";
import UserSchema from "../schemas/UsersSchema.js";

export default {
    addUser: () => {
        return [
            body("email")
                .notEmpty()
                .withMessage("Email is required")
                .toLowerCase()
                .trim()
                .isEmail()
                .withMessage("Please provide valid email")
                .custom(async (email: string) => {
                    //  checks if the username already exists in the database
                    const resp = await UserSchema.findOne({email: email});
                    if (resp) throw new Error("Email already exists");
                }),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .isLength({min: 6, max: 14})
                .withMessage("Password length should be within 6-14 characters"),
        ];
    },
    updateUser: () => {
        return [
            body("id")
                .notEmpty()
                .withMessage("id is required")
                .isMongoId()
                .withMessage("Invalid id")
                .custom(async (id: string) => {
                    //  checks if the username exists in the database
                    const resp = await UserSchema.findById(id);
                    if (!resp) throw new Error("User not found");
                }),
            body("email")
                .optional()
                .toLowerCase()
                .trim()
                .isEmail()
                .withMessage("Please provide valid email")
                .custom(async (email: string) => {
                    //  checks if the username already exists in the database
                    const resp = await UserSchema.findOne({email: email});
                    if (resp) throw new Error("Email already exists");
                }),
            body("password")
                .isLength({min: 6, max: 14})
                .optional()
                .withMessage("Password length should be within 6-14 characters"),
        ];
    },
    deleteUser: () => {
        return [
            body("id")
                .notEmpty()
                .withMessage("id is required")
                .isMongoId()
                .withMessage("Invalid id")
                .custom(async (id: string) => {
                    //  checks if the username exists in the database
                    const resp = await UserSchema.findById(id);
                    if (!resp) throw new Error("User not found");
                }),
        ];
    },
    checkUserId: () => {
        return [
            query("id")
                .notEmpty()
                .withMessage("id is required")
                .isMongoId()
                .withMessage("Invalid id")
                .custom(async (id: string) => {
                    //  checks if the username exists in the database
                    const resp = await UserSchema.findById(id);
                    if (!resp) throw new Error("User not found");
                }),
        ];
    },
};
