const db = [
  {
    name: "Rafael",
    email: "rafael@mail.com",
  },
];

export class UserService {
  createUser = (name: string, email: string) => {
    const user = {
      name,
      email,
    };
    db.push(user);
    console.log("DB updated! ", db);
  };

  getAllUsers = () => {
    return db;
  };
}
