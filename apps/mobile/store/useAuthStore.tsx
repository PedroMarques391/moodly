import decodeToken from "@/utils/decotePayload";
import { getItem, removeItem, saveItem } from "@/utils/storage";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserAuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<UserAuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  setError: async () => set((state) => ({ error: state.error })),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    const token = await getItem("token");

    try {
      if (!token) {
        throw new Error("Operation unauthorized");
      }

      const payload = decodeToken(token);
      const response = await fetch(
        `http://192.168.2.59:3000/api/v1/users/${payload?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        throw new Error("Unauthorized");
      }

      const user = await response.json();
      set({ user });
    } catch (error: any) {
      console.log("[fetchUser]", error);
      set({ user: null, error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await removeItem("token");
    set({ user: null });
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        "http://192.168.2.59:3000/api/v1/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Email ou senha incorretos");
      }

      const data = await response.json();
      await saveItem("token", data.token);
      await get().fetchUser();
      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
  async signIn(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    set({ error: null, isLoading: true });
    try {
      const response = await fetch("http://192.168.2.59:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data?.message || "Erro ao criar usuário");

      await saveItem("token", data.token);
      await get().fetchUser();

      return { success: true };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, error: error.message };
    } finally {
      set({ isLoading: false });
    }
  },
}));
