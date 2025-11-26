import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "../services/user.service";

export function makeUserService() {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  return userService;
}
