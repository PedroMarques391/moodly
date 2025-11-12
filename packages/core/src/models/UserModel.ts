interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
type CreateUser = Pick<User, "name" | "email" | "password">;
type LoginUser = Pick<User, "email" | "password">;
type Payload = Pick<User, "id" | "email" | "name">;

export { CreateUser, LoginUser, Payload, type User };
