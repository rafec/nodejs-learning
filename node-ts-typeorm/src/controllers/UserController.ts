import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  userService: UserService;

  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (request: Request, response: Response) => {
    const user = request.body;

    if (!user.name || !user.email) {
      return response
        .status(400)
        .json({ message: "Bad request! Invalid credentials!" });
    }

    this.userService.createUser(user.name, user.email);
    return response.status(201).json({ message: "User created!" });
  };

  getAllUsers = (request: Request, response: Response) => {
    const users = this.userService.getAllUsers();

    return response.status(200).json(users);
  };

  deleteUser = (request: Request, response: Response) => {
    const user = request.body;
    console.log("Deleting user: ", user);
    return response.status(200).json({ message: "User deleted!" });
  };
}
