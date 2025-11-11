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

export { CreateUser, LoginUser, type User };
