import { MoodStore } from "@/interfaces/moodStore";
import { create } from "zustand";

export const useMoodStore = create<MoodStore>((set) => ({
  mood: [],
  isLoading: false,
  error: null,
  setMood: async (mood) => set({ mood }),
  setError: (error) => set({ error }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
