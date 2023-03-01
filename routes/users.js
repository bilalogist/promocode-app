import express from "express";
import validator from "../app/validations/validator.js";
import userRules from "../app/validations/userRules.js";
import userController from "../app/controllers/userController.js";

const router = express.Router();

router.post("/", userRules.addUser(), validator, userController.addUser);

router.get("/", userRules.checkUserId(), validator, userController.getUser);

router.put("/", userController.updateUser);

router.delete(
  "/",
  userRules.deleteUser(),
  validator,
  userController.deleteUser
);

export default router;
