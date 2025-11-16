export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  bio: string;
  baselineMood:
    | "very_low"
    | "low"
    | "neutral"
    | "good"
    | "very_good"
    | undefined;
  triggers: string;
  copingStrategies: string;
  goals: string;
}
