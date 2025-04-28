import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const UserRoter = Router();

const controller = new UserController();

UserRoter.post(
  "/user",
  AuthMiddleware,
  controller.createUserController.bind(controller)
);

UserRoter.get(
  "/users",
  AuthMiddleware,
  controller.getAllUserController.bind(controller)
);

UserRoter.get(
  "/user/:id",
  AuthMiddleware,
  controller.getOneUserController.bind(controller)
);

UserRoter.put(
  "/user/:id",
  AuthMiddleware,
  controller.updateUserController.bind(controller)
);

UserRoter.delete(
  "/user/:id",
  AuthMiddleware,
  controller.deleteUserController.bind(controller)
);

export default UserRoter;
