import { User } from "./user";

export type Payload = Pick<User, "id" | "email" | "name">;
