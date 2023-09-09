import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { MakeMockResponse } from "../__mocks__/mockResponse.mock";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
  };

  const userController = new UserController(mockUserService as UserService);

  it("Should add a new user.", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "rafael@mail.com",
      },
    } as Request;
    const mockResponse = MakeMockResponse();
    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({ message: "User created!" });
  });
});
