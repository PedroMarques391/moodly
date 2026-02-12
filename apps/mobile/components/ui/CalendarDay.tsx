import getMoodColor from "@/utils/getMoodColor";
import { Mood } from "@moodly/core";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

type CalendarDayProps = {
  day: number;
  mood?: Mood;
};

export default function CalendarDay({ day, mood }: CalendarDayProps) {
  const router = useRouter();

  const handlePress = () => {
    if (mood) {
      router.push(`/mood/${mood.id}`);
    }
  };

  const color = mood ? getMoodColor(mood.rating) : "#f0f0f0";

  return (
    <TouchableOpacity
      style={[styles.dayCell, { backgroundColor: color }]}
      onPress={handlePress}
      disabled={!mood}
      activeOpacity={0.7}
    >
      <Text style={[styles.dayText, { color: mood ? "#fff" : "#999" }]}>
        {day}
      </Text>
      {mood && <Text style={styles.emoji}>{mood.emoji}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  dayText: {
    fontSize: 10,
    fontWeight: "600",
  },
  emoji: {
    fontSize: 16,
    marginTop: 2,
  },
});
