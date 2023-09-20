import { UserService } from "./UserService";

jest.mock("../repositories/UserRepository");
jest.mock("../database", () => {
  initialize: jest.fn();
});

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
    const token = await userService.getToken("marcelo@mail.com", "123456");
    expect(token).toBe("123456");
  });
});
