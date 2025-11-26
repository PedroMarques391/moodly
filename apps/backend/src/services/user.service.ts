import {
  createUserDTO,
  LoginUser,
  Payload,
  updateUserDTO,
  User,
  UserRepositoryModel,
} from "@moodly/core";
import bycrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepositoryModel) {}
  async createUser({ name, email, password }: createUserDTO) {
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
    const isValidPassword = await bycrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("USER_OR_PASSWORD_INCORRECT");

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

  async update(id: string, user: updateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new Error("USER_NOT_FOUND");
    await this.userRepository.update(id, user);
    return;
  }
}
