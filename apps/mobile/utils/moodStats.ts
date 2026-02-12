import { BaselineMood, Mood } from "@moodly/core";

export function moodToNumeric(rating: BaselineMood): number {
  const mapping = {
    very_low: 1,
    low: 2,
    neutral: 3,
    good: 4,
    very_good: 5,
  };
  return mapping[rating] || 3;
}

export function calculateStreak(moods: Mood[]): number {
  if (moods.length === 0) return 0;

  const sortedMoods = [...moods].sort(
    (a, b) =>
      new Date(b.dateLogged).getTime() - new Date(a.dateLogged).getTime(),
  );

  let streak = 1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastMoodDate = new Date(sortedMoods[0].dateLogged);
  lastMoodDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor(
    (today.getTime() - lastMoodDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (daysDiff > 1) return 0;

  for (let i = 1; i < sortedMoods.length; i++) {
    const currentDate = new Date(sortedMoods[i - 1].dateLogged);
    currentDate.setHours(0, 0, 0, 0);

    const prevDate = new Date(sortedMoods[i].dateLogged);
    prevDate.setHours(0, 0, 0, 0);

    const diff = Math.floor(
      (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function calculateAverage(moods: Mood[]): number {
  if (moods.length === 0) return 0;

  const sum = moods.reduce((acc, mood) => acc + moodToNumeric(mood.rating), 0);
  return Number((sum / moods.length).toFixed(1));
}

export function getMostFrequentEmoji(moods: Mood[]): string {
  if (moods.length === 0) return "😊";

  const emojiCount: Record<string, number> = {};

  moods.forEach((mood) => {
    emojiCount[mood.emoji] = (emojiCount[mood.emoji] || 0) + 1;
  });

  return Object.entries(emojiCount).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

export function getTotalMoods(moods: Mood[]): number {
  return moods.length;
}

export function getMoodsByPeriod(moods: Mood[], days: number): Mood[] {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  cutoffDate.setHours(0, 0, 0, 0);

  return moods.filter((mood) => {
    const moodDate = new Date(mood.dateLogged);
    return moodDate >= cutoffDate;
  });
}

export function getCurrentMonthMoods(moods: Mood[]): Mood[] {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  return moods.filter((mood) => {
    const moodDate = new Date(mood.dateLogged);
    return (
      moodDate.getMonth() === currentMonth &&
      moodDate.getFullYear() === currentYear
    );
  });
}
