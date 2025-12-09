import { z } from "zod";

const moodSchema = z.object({
  rating: z.enum(["very_low", "low", "neutral", "good", "very_good"]),
  description: z.string().min(1, "Ei, não esqueca a sua descrição.").max(200),
  emoji: z
    .string()
    .min(1, "Ei, não esqueca o seu emoji.")
    .max(2, "Use apenas um emoji."),
  dateLogged: z.date(),
});

type MoodData = z.infer<typeof moodSchema>;

export { moodSchema, type MoodData };
