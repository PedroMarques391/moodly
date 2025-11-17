import {
  CreateMoodDTO,
  Mood,
  MoodRepositoryModel,
  UpdateMoodDTO,
} from "@moodly/core";
import { MoodRepository } from "../repository/MoodRepository";

export class MoodService {
  private moodRepository: MoodRepositoryModel;
  constructor() {
    this.moodRepository = new MoodRepository();
  }

  async createMood(userId: string, data: CreateMoodDTO): Promise<void> {
    if (!userId) throw new Error("USER_NOT_FOUND");
    await this.moodRepository.createMood(userId, data);
  }

  async getMoods(userId: string): Promise<Mood[]> {
    if (!userId) throw new Error("USER_NOT_FOUND");
    const moods = await this.moodRepository.getMoods(userId);
    return moods;
  }

  async getMoodById(id: string): Promise<Mood> {
    const mood = await this.moodRepository.getMoodById(id);
    if (!mood) throw new Error("MOOD_NOT_FOUND");
    return mood;
  }

  async deleteMood(id: string): Promise<void> {
    const mood = await this.moodRepository.getMoodById(id);
    if (!mood) throw new Error("THIS_MOOD_NOT_EXISTS");
    await this.moodRepository.deleteMood(id);
  }

  async updateMood(id: string, data: UpdateMoodDTO): Promise<void> {
    const mood = await this.moodRepository.getMoodById(id);
    if (!mood) throw new Error("THIS_MOOD_NOT_EXISTS");
    await this.moodRepository.updateMood(id, data);
  }
}

const moodService = new MoodService();

export default moodService;
