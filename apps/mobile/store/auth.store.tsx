import { IAuthStore } from "@/interfaces/authStore";
import { create } from "zustand";

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  setUser: async (user) => set(() => ({ user })),
  isLoading: false,
  error: null,
  setError: (error) => set({ error }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
