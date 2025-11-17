import { createUserDTO } from "../dto";
import { Payload, User } from "./user";

export default interface UserRepositoryModel {
  findByEmail(email: string): Promise<User | null>;
  createUser(user: createUserDTO): Promise<Payload>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<void>;
}
