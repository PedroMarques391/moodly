import { UserRepositoryModel } from "@moodly/core";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/user.service";

export function makeUserService() {
  const userRepository: UserRepositoryModel = new UserRepository();
  const userService = new UserService(userRepository);
  return userService;
}
