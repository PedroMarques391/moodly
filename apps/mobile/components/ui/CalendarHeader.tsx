import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const WEEK_DAYS = ["D", "S", "T", "Q", "Q", "S", "S"];

export default function CalendarHeader() {
  return (
    <View style={styles.weekDays}>
      {WEEK_DAYS.map((day, index) => (
        <Text key={index} style={styles.weekDayText}>
          {day}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  weekDayText: {
    width: 40,
    textAlign: "center",
    fontWeight: "600",
    color: "#666",
    fontSize: 12,
  },
});
