import {
  CreateUser,
  Encrypt,
  LoginUser,
  UserRepositoryModel,
} from "@moodly/core";
import { UserRepository } from "../repository/UserRepository";

class UserService {
  private userRepository: Partial<UserRepositoryModel>;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUser({ name, email, password }: CreateUser) {
    const existing = await this.userRepository.findByEmail(email);
    console.log(existing);

    if (existing) throw new Error("USER_ALREADY_EXISTS");

    const hashedPassword = await Encrypt.generate(password);

    await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return;
  }

  async loginUser({ email, password }: LoginUser) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("USER_NOT_FOUND");
    if (user.password !== password) throw new Error("PASSWORD_INCORRECT");
    return user;
  }
}

const userService = new UserService();

export default userService;
