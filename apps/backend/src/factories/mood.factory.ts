import { MoodRepositoryModel } from "@moodly/core";
import { MoodRepository } from "../repositories/MoodRepository";
import { MoodService } from "../services/mood.service";

export function makeMoodService() {
  const moodRepository: MoodRepositoryModel = new MoodRepository();
  const moodService = new MoodService(moodRepository);
  return moodService;
}
