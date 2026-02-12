import getMoodColor from "@/utils/getMoodColor";
import { moodToNumeric } from "@/utils/moodStats";
import { Mood } from "@moodly/core";
import * as shape from "d3-shape";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";

type MoodChartProps = {
  moods: Mood[];
  days?: number;
};

export default function MoodChart({ moods, days = 7 }: MoodChartProps) {
  const chartData = useMemo(() => {
    if (moods.length === 0) return [];

    const sortedMoods = [...moods]
      .sort(
        (a, b) =>
          new Date(a.dateLogged).getTime() - new Date(b.dateLogged).getTime(),
      )
      .slice(-days);

    return sortedMoods.map((mood) => moodToNumeric(mood.rating));
  }, [moods, days]);

  const averageColor = useMemo(() => {
    if (moods.length === 0) return "#6366F1";
    const avgRating = moods[moods.length - 1]?.rating;
    return getMoodColor(avgRating);
  }, [moods]);

  if (chartData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhum registro nos últimos {days} dias
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LineChart
        style={styles.chart}
        data={chartData}
        svg={{
          stroke: averageColor,
          strokeWidth: 3,
        }}
        contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
        curve={shape.curveNatural}
        numberOfTicks={5}
      ></LineChart>
      <View style={styles.labelsContainer}>
        <Text style={styles.label}>Muito Mal</Text>
        <Text style={styles.label}>Muito Bem</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  chart: {
    height: 200,
  },
  emptyContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
});
