import CalendarGrid from "@/components/ui/CalendarGrid";
import CalendarHeader from "@/components/ui/CalendarHeader";
import { Mood } from "@moodly/core";
import React from "react";
import { StyleSheet, View } from "react-native";

type MoodCalendarProps = {
  moods: Mood[];
};

export default function MoodCalendar({ moods }: MoodCalendarProps) {
  return (
    <View style={styles.container}>
      <CalendarHeader />
      <CalendarGrid moods={moods} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
