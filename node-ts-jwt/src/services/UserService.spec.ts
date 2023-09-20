import { UserService } from "./UserService";
import * as jwt from "jsonwebtoken";

jest.mock("../repositories/UserRepository");
jest.mock("../database", () => {
  initialize: jest.fn();
});
jest.mock("jsonwebtoken");

const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);
  const mockUser = {
    id_user: "123456",
    name: "Marcelo",
    email: "marcelo@mail.com",
    password: "123456",
  };

  it("Must add a new user.", async () => {
    mockUserRepository.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));
    const response = await userService.createUser(
      "Marcelo",
      "marcelo@mail.com",
      "123456"
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id_user: "123456",
      name: "Marcelo",
      email: "marcelo@mail.com",
      password: "123456",
    });
  });

  it("Must return an user token", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, "sign").mockImplementation(() => "token");
    const token = await userService.getToken("marcelo@mail.com", "123456");
    expect(token).toBe("token");
  });

  it("Must return an error in case it do not find an user", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(null));
    await expect(
      userService.getToken("invalid@mail.com", "123456")
    ).rejects.toThrowError(new Error("Invalid credentials!"));
  });
});
