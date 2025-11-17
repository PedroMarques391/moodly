import { BaselineMood } from "../../models";

export interface UpdateMoodDTO {
  rating?: BaselineMood;
  description?: string;
  emoji?: string;
}
