import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const AuthRouter = Router();

const controller = new AuthController();

AuthRouter.post(
  "/auth/register",
  controller.registerController.bind(controller)
);

AuthRouter.post("/auth/login", controller.loginController.bind(controller));

export default AuthRouter;
