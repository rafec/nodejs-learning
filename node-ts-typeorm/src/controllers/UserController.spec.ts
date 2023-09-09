import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { MakeMockResponse } from "../__mocks__/mockResponse.mock";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";

describe("UserController", () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
  };

  const userController = new UserController(mockUserService as UserService);
  const mockResponse = MakeMockResponse();

  it("Should add a new user.", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "rafael@mail.com",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({ message: "User created!" });
  });

  it("Should return an error in case the user don't input a name", () => {
    const mockRequest = {
      body: {
        name: "",
        email: "rafael@mail.com",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Invalid credentials!",
    });
  });

  it("Should return an error in case the user don't input an email", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Invalid credentials!",
    });
  });

  it("Should return the list of users", () => {
    const mockRequest = makeMockRequest({});
    userController.getAllUsers(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
  });

  it("Should return a message informing that the user was deleted", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "rafael@mail.com",
      },
    } as Request;

    userController.deleteUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: "User deleted!",
    });
  });
});
