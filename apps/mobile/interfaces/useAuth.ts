interface IUseAuth {
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
}

export default IUseAuth;
