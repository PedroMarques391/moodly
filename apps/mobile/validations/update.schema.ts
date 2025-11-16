import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(1, "Ei, não esqueca o seu nome."),
  bio: z.string().max(200).optional(),
  baselineMood: z
    .enum(["very_low", "low", "neutral", "good", "very_good"])
    .optional(),

  triggers: z.string(z.string().max(50)).optional(),
  copingStrategies: z.string(z.string().max(50)).optional(),
  goals: z.string(z.string().max(100)).optional(),
});

type UpdateData = z.infer<typeof updateSchema>;

export { updateSchema, type UpdateData };
