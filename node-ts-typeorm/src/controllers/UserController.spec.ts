import { UserService } from "../services/UserService";
import { UserController } from "./UserController";
import { Request } from "express";
import { MakeMockResponse } from "../__mocks__/mockResponse.mock";

const mockUserService = {
  createUser: jest.fn(),
};

jest.mock("../services/UserService", () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService;
    }),
  };
});

describe("UserController", () => {
  const userController = new UserController();
  const mockResponse = MakeMockResponse();

  it("Must add a new user.", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "rafael@mail.com",
        password: "123456",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({ message: "User created!" });
  });

  it("Must return an error in case the user don't input a name", () => {
    const mockRequest = {
      body: {
        name: "",
        email: "rafael@mail.com",
        password: "123456",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Invalid credentials!",
    });
  });

  it("Must return an error in case the user don't input an email", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "",
        password: "123456",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Invalid credentials!",
    });
  });

  it("Must return an error in case the user don't input a password", () => {
    const mockRequest = {
      body: {
        name: "Rafael",
        email: "rafael@mail.com",
        password: "",
      },
    } as Request;

    userController.createUser(mockRequest, mockResponse);
    expect(mockResponse.state.status).toBe(400);
    expect(mockResponse.state.json).toMatchObject({
      message: "Bad request! Invalid credentials!",
    });
  });

  it("Must return a message informing that the user was deleted", () => {
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
