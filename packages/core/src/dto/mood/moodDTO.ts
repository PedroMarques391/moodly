import { BaselineMood } from "../../models";

export interface CreateMoodDTO {
  rating: BaselineMood;
  description: string;
  emoji: string;
  dateLogged: Date;
}
