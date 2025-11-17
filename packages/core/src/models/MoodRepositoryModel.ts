import { CreateMoodDTO, UpdateMoodDTO } from "../dto";
import { Mood } from "./mood/mood";

export default interface MoodRepositoryModel {
  createMood(userId: string, data: CreateMoodDTO): Promise<void>;
  deleteMood(id: string): Promise<void>;
  updateMood(id: string, data: UpdateMoodDTO): Promise<void>;
  getMoodById(id: string): Promise<Mood | null>;
  getMoods(userId: string): Promise<Mood[] | []>;
  getMoodsByDateRange(
    userId: string,
    initalDate: Date,
    finalDate: Date
  ): Promise<Mood[] | []>;

  checkMoodExistsByDate(userId: string, date: Date): Promise<boolean>;
}
