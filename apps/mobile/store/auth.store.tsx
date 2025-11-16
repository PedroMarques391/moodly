import { IAuthStore } from "@/interfaces/authStore";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: async (user) => set({ user }),
  setError: (error) => set({ error }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
