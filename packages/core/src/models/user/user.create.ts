import { User } from "./user";

export type CreateUser = Pick<User, "name" | "email" | "password">;
