import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class LoginController {
  login = async (request: Request, response: Response) => {
    const tokenData = {
      name: user.name,
      email: user.email,
    };

    const tokenKey = "123456789";

    const tokenOptions = {
      subject: user.id_user,
    };

    const token = sign(tokenData, tokenKey, tokenOptions);

    return response.status(200).json({ token });
  };
}
