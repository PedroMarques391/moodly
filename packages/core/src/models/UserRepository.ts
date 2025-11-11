import { CreateUser, LoginUser, User } from "./UserModel";

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: CreateUser): Promise<void>;
  login(user: LoginUser): Promise<User | null>;
}
