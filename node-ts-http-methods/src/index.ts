import express, { Request, Response } from "express";
import { UserController } from "./controllers/UserController";

const userController = new UserController();

const server = express();

server.use(express.json());

server.get("/", (request: Request, response: Response) => {
  return response.status(200).json({ message: "DioBank API" });
});

server.post("/user", userController.createUser);

server.listen(5000, () => console.log("Server started!"));
