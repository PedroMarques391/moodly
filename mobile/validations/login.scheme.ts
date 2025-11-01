import { z } from "zod";

const loginScheme = z.object({
  email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginData = z.infer<typeof loginScheme>;

export { loginScheme, type LoginData };
