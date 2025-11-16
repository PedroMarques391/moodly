import { User } from "./user";

export type UpdateUser = Partial<
  Omit<User, "id" | "email" | "password" | "createdAt" | "updatedAt">
>;
