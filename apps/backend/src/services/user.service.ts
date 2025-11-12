import { CreateUser, LoginUser, User, UserRepositoryModel } from "@moodly/core";
import bycrypt from "bcrypt";
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

    const hashedPassword = await bycrypt.hash(password, 10);

    await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return;
  }

  async loginUser({ email, password }: LoginUser): Promise<Partial<User>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error("USER_OR_PASSWORD_INCORRECT");
    const descriptedPassword = await bycrypt.compare(password, user.password);
    if (!descriptedPassword) throw new Error("USER_OR_PASSWORD_INCORRECT");

    await this.userRepository.login({ email, password });
    return {
      name: user.name,
      email: user.email,
    };
  }
}

const userService = new UserService();

export default userService;
