import User from "./UserModel";

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: Pick<User, "name" | "email" | "password">): Promise<void>;
  login(user: Pick<User, "email" | "password">): Promise<User | null>;
}
