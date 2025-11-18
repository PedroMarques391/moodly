import { theme } from "@/theme/theme";
import { BaselineMood } from "@moodly/core";

const getMoodColor = (rating: BaselineMood) => {
  const colors = {
    very_good: theme.colors.moodHappy,
    good: theme.colors.moodCalm,
    neutral: theme.colors.moodNeutral,
    low: "#7BA8C9",
    very_low: theme.colors.moodSad,
  };
  return colors[rating] || "#C4C4C4";
};

export default getMoodColor;
