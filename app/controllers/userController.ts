import apiResponse from "../helpers/apiResponse.js";
import userService from "../services/userService.js";
import { Request, Response } from "express";
const userController = {
  // gets the user info by the id in the request query
  getUser: async (req: Request, res: Response) => {
    try {
      const { _id, __v, password, ...user } = await userService.getUser(
        req.query.id
      );

      apiResponse(res, false, "", { id: _id, ...user });
    } catch (err) {
      apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
    }
  },
  // add the user in mongodb by the json in the request body
  addUser: async (req: Request, res: Response) => {
    try {
      const { _id, __v, password, ...user } = await userService.addUser(
        req.body
      );

      apiResponse(res, false, "User created", { id: _id, ...user });
    } catch (err) {
      apiResponse(res, true, err.message, null, "INTERNAL_SERVER_ERROR");
    }
  },
  // updates the user info by the json in the request body against the id in body

  updateUser: async (req: Request, res: Response) => {
    try {
      const { _id, __v, password, ...user } = await userService.updateUser(
        req.body
      );

      apiResponse(res, false, "User updated", { id: _id, ...user });
    } catch (err) {
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
    } catch (err) {
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

export default userController;
