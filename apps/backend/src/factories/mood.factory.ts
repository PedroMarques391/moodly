import { MoodRepository } from "../repositories/MoodRepository";
import { MoodService } from "../services/mood.service";

export function makeMoodService() {
  const moodRepository = new MoodRepository();
  const moodService = new MoodService(moodRepository);
  return moodService;
}
