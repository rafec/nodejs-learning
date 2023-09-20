import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { LoginController } from "./controllers/LoginController";

export const router = Router();

const userController = new UserController();
const loginController = new LoginController();

router.get("/user/:userId", userController.getUser);
router.post("/user", userController.createUser);
router.delete("/user", userController.deleteUser);
router.post("/login", loginController.login);
