import { User } from "@moodly/core";

export interface UserStore {
  user: Omit<User, "password"> | User | null;
  setUser: (user: User | null) => Promise<void>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  error: string | null;
}
