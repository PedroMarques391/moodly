import { Mood } from "@moodly/core";

export interface MoodStore {
  mood: Mood[] | [];
  setMood: (mood: Mood[] | []) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  error: string | null;
}
