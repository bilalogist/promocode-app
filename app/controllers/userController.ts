import apiResponse from "../helpers/apiResponse.js";
import userService from "../services/userService.js";
import {Request, Response} from "express";

const userController = {
        // gets the user info by the id in the request query
        getUser: async (req: Request, res: Response) => {
            try {
                const id = req.query.id as string;

                const user = await userService.getUser(id);
                apiResponse(res, false, "", {id: user?._id, email: user?.email, promoCode: user?.promoCode});

            } catch (err: any) {
                apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
            }
        }
        ,
        // add the user in mongodb by the json in the request body
        addUser: async (req: Request, res: Response) => {
            try {
                const user = await userService.addUser(
                    {...req.body, promoCode: await userController.generateRandomCode()}
                );

                apiResponse(res, false, "User created", {id: user?._id, email: user?.email, promoCode: user?.promoCode});
            } catch (err: any) {
                apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
            }
        },
        // updates the user info by the json in the request body against the id in body

        updateUser: async (req: Request, res: Response) => {
            try {
                const user = await userService.updateUser(
                    req.body
                );

                apiResponse(res, false, "User updated", {id: user?._id, email: user?.email, promoCode: user?.promoCode});
            } catch (err: any) {
                apiResponse(
                    res,
                    true,
                    err.message,
                    null,
                    err.status ?? "INTERNAL_SERVER_ERROR"
                );
            }
        },
        // deletes the user from mongodb by the id in the request body

        deleteUser: async (req: Request, res: Response) => {
            try {
                const user = await userService.deleteUser(req.body);
                apiResponse(res, false, "User Deleted", null);
            } catch (err: any) {
                apiResponse(
                    res,
                    true,
                    err.message,
                    null,
                    err.status ?? "INTERNAL_SERVER_ERROR"
                );
            }
        },

// generates a random 6 characters code
        generateRandomCode: async () => {
            const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let promoCode = "";
            do {
                // keep generating promo codes until we find one that is not present in the database
                for (let i = 0; i < 6; i++) {
                    const index = Math.floor(Math.random() * characters.length);
                    promoCode += characters[index];
                }
            } while (await userService.promoCodeExists(promoCode))
            return promoCode; // return the unique promo code


        },
    }
;

export default userController;
