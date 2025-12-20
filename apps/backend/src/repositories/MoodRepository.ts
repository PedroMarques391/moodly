import {
  CreateMoodDTO,
  Mood,
  MoodRepositoryModel,
  UpdateMoodDTO,
} from "@moodly/core";
import { prisma } from "../database/prismaORM/initialize";

export class MoodRepository implements MoodRepositoryModel {
  async createMood(userId: string, data: CreateMoodDTO): Promise<void> {
    await prisma.mood.create({
      data: {
        dateLogged: data.dateLogged,
        emoji: data.emoji,
        description: data.description,
        rating: data.rating,
        userId: userId,
      },
    });
  }

  async getMoods(userId: string): Promise<Mood[] | []> {
    const moods = await prisma.mood.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return moods;
  }

  async getMoodById(id: string): Promise<Mood | null> {
    const mood = prisma.mood.findUnique({ where: { id } });
    return mood;
  }

  async deleteMood(id: string): Promise<void> {
    await prisma.mood.delete({ where: { id } });
  }

  async updateMood(id: string, data: UpdateMoodDTO): Promise<void> {
    await prisma.mood.update({
      where: { id },
      data,
    });
  }

  getMoodsByDateRange(
    userId: string,
    initalDate: Date,
    finalDate: Date
  ): Promise<Mood[] | []> {
    throw new Error("Method not implemented.");
  }

  checkMoodExistsByDate(userId: string, date: Date): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
