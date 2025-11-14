import { CreateUser, Payload, User, UserRepositoryModel } from "@moodly/core";
import { prisma } from "../database/initialize";

export class UserRepository implements UserRepositoryModel {
  async findByEmail(email: string) {
    return prisma.users.findUnique({ where: { email } });
  }
  async createUser({ name, email, password }: CreateUser): Promise<Payload> {
    const user = await prisma.users.create({
      data: {
        name,
        email,
        image:
          "https://i.pinimg.com/736x/91/ad/3c/91ad3c9af6b8240a5e806230f4eeb8a0.jpg",
        password,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async update(id: string, user: Partial<User>): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
