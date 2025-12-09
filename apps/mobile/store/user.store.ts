import { UserStore } from "@/interfaces/authStore";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: async (user) => set({ user }),
  setError: (error) => set({ error }),
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
