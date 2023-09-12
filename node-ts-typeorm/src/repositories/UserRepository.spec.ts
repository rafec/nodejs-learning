import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";

describe("User Repository", () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>;

  const mockUser: User = {
    user_id: "12345",
    name: "Test User",
    email: "test@mail.com",
    password: "password",
  };

  beforeAll(async () => {
    managerMock = await getMockEntityManager({});
    userRepository = new UserRepository(managerMock as EntityManager);
  });

  it("Must register a new user in the database", async () => {
    await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
  });
});
