import z from "zod";

export class UserSchema {
  static createUser = {
    tags: ["User"],
    summary: "Criar Usuário.",
    body: z
      .object({
        name: z.string().min(4, "must be at least 4 characters long"),
        email: z.email("invalid email"),
        password: z.string().min(6, "must be at least 6 characters long"),
      })
      .strict(),
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
    body: z
      .object({
        email: z.email("invalid email"),
        password: z.string().min(6, "must be at least 6 characters long"),
      })
      .strict(),
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

  static updateUser = {
    tags: ["User"],
    summary: "Editar informações do usuário.",
    body: z
      .object({
        name: z.string().optional(),
        image: z.string().optional(),
        bio: z.string().optional(),
        baselineMood: z
          .enum(
            ["very_low", "low", "neutral", "good", "very_good"],
            "invalid baselineMood."
          )
          .optional(),
        copingStrategies: z.string().optional(),
        goals: z.string().optional(),
      })
      .strict(),
    response: {
      200: z.object({
        message: z.string(),
      }),
      400: z.object({
        error: z.string(),
        message: z.string(),
      }),
    },
  };
}
