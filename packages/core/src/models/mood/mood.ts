import { BaselineMood } from "./baselineMood";

export interface Mood {
  id: string;
  rating: BaselineMood;
  dateLogged: Date;
  description: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
