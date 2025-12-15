import z from "zod";

export class UserSchema {
  static createUser = {
    tags: ["User"],
    summary: "Criar Usuário.",
    body: z.object({
      name: z.string().min(4, "must be at least 4 characters long"),
      email: z.email("invalid email"),
      password: z.string().min(6, "must be at least 6 characters long"),
    }),
    response: {
      201: z.object({
        message: z.string(),
      }),
      400: z.object({
        error: z.string(),
        message: z.string(),
      }),
    },
  };

  static loginUser = {
    tags: ["User"],
    summary: "Logar Usuário.",
    body: z.object({
      email: z.email("invalid email"),
      password: z.string().min(6, "must be at least 6 characters long"),
    }),
    response: {
      200: z.object({
        token: z.string(),
      }),
      400: z.object({
        error: z.number(),
        message: z.string(),
      }),
    },
  };
}
