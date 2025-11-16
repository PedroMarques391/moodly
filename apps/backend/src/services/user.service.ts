import {
  CreateUser,
  LoginUser,
  Payload,
  UpdateUser,
  User,
  UserRepositoryModel,
} from "@moodly/core";
import bycrypt from "bcrypt";
import { UserRepository } from "../repository/UserRepository";

class UserService {
  private userRepository: UserRepositoryModel;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser({ name, email, password }: CreateUser) {
    const existing = await this.userRepository.findByEmail(email);

    if (existing) throw new Error("USER_ALREADY_EXISTS");

    const hashedPassword = await bycrypt.hash(password, 10);

    const newUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  }

  async loginUser({ email, password }: LoginUser): Promise<Payload> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("USER_OR_PASSWORD_INCORRECT");
    const descriptedPassword = await bycrypt.compare(password, user.password);
    if (!descriptedPassword) throw new Error("USER_OR_PASSWORD_INCORRECT");

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async getUser(email: string): Promise<Omit<User, "password">> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("USER_NOT_FOUND");
    return {
      ...user,
    };
  }

  async update(id: string, user: UpdateUser): Promise<void> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new Error("USER_NOT_FOUND");
    await this.userRepository.update(id, user);
    return;
  }
}

const userService = new UserService();

export default userService;
