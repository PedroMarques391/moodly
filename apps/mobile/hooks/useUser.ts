import IUseAuth from "@/interfaces/useAuth";
import { useUserStore } from "@/store/user.store";
import { getItem, removeItem, saveItem } from "@/utils/storage";
import { User } from "@moodly/core";
import { useCallback } from "react";

export const useUsers = (): IUseAuth => {
  const { setError, setIsLoading, setUser } = useUserStore.getState();

  const getUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const token = await getItem("token");

    try {
      if (!token) {
        throw new Error("Operation unauthorized");
      }

      const response = await fetch(
        `http://192.168.2.59:3000/api/v1/users/profile`,
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
      setUser(user);
    } catch (error: any) {
      console.log("[fetchUser]", error);
      setUser(null);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, setUser]);
  async function signIn(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
    setError(null);
    setIsLoading(true);
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

      await getUser();

      return { success: true };
    } catch (error: any) {
      setError(error.message);

      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    await removeItem("token");
    setUser(null);
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);
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
      await getUser();
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUser(id: string, data: Partial<User>) {
    setIsLoading(true);
    try {
      const token = await getItem("token");

      const response = await fetch(
        `http://192.168.2.59:3000/api/v1/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao atualizar o perfil.");
      }

      await getUser();
      return { success: true };
    } catch (error: any) {
      console.error("Falha ao atualizar:", error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }

  return { signIn, getUser, logout, login, updateUser };
};
