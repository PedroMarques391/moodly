import { BaselineMood } from "@moodly/core";

const getMoodText = (rating: BaselineMood) => {
  const text = {
    very_good: "Feliz",
    good: "Calmo",
    neutral: "Neutro",
    low: "Triste",
    very_low: "Com Raiva",
  };
  return text[rating] || "Neutro";
};

export default getMoodText;
