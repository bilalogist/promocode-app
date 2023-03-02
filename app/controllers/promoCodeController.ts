import {Request, Response} from "express";
import apiResponse from "../helpers/apiResponse.js";
import userService from "../services/userService.js";

const promoController = {
    // fetches the user with which the promo code is connected
    getPromoCodeInfo: async (req: Request, res: Response) => {
        try {
            let {_id, ...user} = await userService.getPromoInfo(
                req?.params?.promoCode
            );

            apiResponse(res, false, "", {connectedUser: {id: _id, ...user}});
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

};

export default promoController;
