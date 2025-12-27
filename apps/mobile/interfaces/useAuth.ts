import { User } from "@moodly/core";

interface IUseRequest {
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
  getUser: () => Promise<void>;
  updateUser: (
    id: string,
    data: Partial<User>
  ) => Promise<{ success: boolean; error?: string }>;
  uploadImage: (
    formData: FormData
  ) => Promise<{ success: boolean; url?: string; error?: string }>;
}

export default IUseRequest;
