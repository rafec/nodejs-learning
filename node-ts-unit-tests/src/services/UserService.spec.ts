import { IUser, UserService } from "./UserService";

describe("UserService", () => {
  const mockDb: IUser[] = [];
  const userService = new UserService(mockDb);

  it("Should add a new user.", () => {
    const mockConsole = jest.spyOn(global.console, "log");
    userService.createUser("Marcelo", "Marcelo@mail.com");
    expect(mockConsole).toHaveBeenCalledWith("DB updated! ", mockDb);
  });
});
