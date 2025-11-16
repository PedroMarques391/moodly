import { User } from "./user";

type LoginUser = Pick<User, "email" | "password">;

export default LoginUser;
