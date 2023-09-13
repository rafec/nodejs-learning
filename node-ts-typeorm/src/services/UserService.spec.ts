import { UserService } from "./UserService";

jest.mock("../repositories/UserRepository");

const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);

  it("Should add a new user.", async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() =>
      Promise.resolve({
        user_id: "123456",
        name: "Marcelo",
        email: "marcelo@mail.com",
        password: "123456",
      })
    );
    const response = await userService.createUser(
      "Marcelo",
      "marcelo@mail.com",
      "123456"
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      user_id: "123456",
      name: "Marcelo",
      email: "marcelo@mail.com",
      password: "123456",
    });
  });
});
