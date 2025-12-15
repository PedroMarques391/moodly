import z from "zod";

export class MoodScheme {
  static createMood = {
    tags: ["Mood"],
    summary: "Criar Mood.",
    body: z
      .object({
        dateLogged: z.coerce.date("invalid date").refine((date) => {
          const today = new Date();
          return date <= today;
        }, "date must be in the past"),
        emoji: z
          .string()
          .min(1, "don't leave empty")
          .max(2, "just one emoji")
          .regex(/\p{Emoji}/u, "must be a valid emoji"),
        description: z
          .string()
          .min(1, "don't leave empty")
          .max(100, "too long"),
        rating: z.enum(
          ["very_low", "low", "neutral", "good", "very_good"],
          "invalid baselineMood."
        ),
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
}
