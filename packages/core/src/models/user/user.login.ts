import { User } from "./user";

export type LoginUser = Pick<User, "email" | "password">;
