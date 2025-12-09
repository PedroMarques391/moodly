import { BaselineMood } from "@moodly/core";

const getMoodText = (rating: BaselineMood) => {
  const text = {
    very_good: "Muito Bem",
    good: "Bem",
    neutral: "Neutro",
    low: "Para Baixo",
    very_low: "Triste",
  };
  return text[rating] || "Neutro";
};

export default getMoodText;
