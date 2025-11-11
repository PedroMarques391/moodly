import { CreateUser, LoginUser, User } from "./UserModel";

export default interface UserRepositoryModel {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: CreateUser): Promise<void>;
  login(user: LoginUser): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<void>;
}
