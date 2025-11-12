import { CreateUser, LoginUser, User, UserRepositoryModel } from "@moodly/core";
import { prisma } from "../database/initialize";

export class UserRepository implements UserRepositoryModel {
  async findByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }
  async createUser({ name, email, password }: CreateUser) {
    await prisma.users.create({
      data: {
        name,
        email,
        image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        password,
      },
    });
  }

  async login({ email, password }: LoginUser): Promise<void> {
    await prisma.users.findUnique({ where: { email, password } });
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
