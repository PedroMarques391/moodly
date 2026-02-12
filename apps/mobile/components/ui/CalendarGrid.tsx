import CalendarDay from "@/components/ui/CalendarDay";
import {
  getCurrentMonthYear,
  getDayOfMonth,
  getDaysInMonth,
  getFirstDayOfMonth,
} from "@/utils/dateHelpers";
import { Mood } from "@moodly/core";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

type CalendarGridProps = {
  moods: Mood[];
};

export default function CalendarGrid({ moods }: CalendarGridProps) {
  const calendarData = useMemo(() => {
    const { month, year } = getCurrentMonthYear();

    const firstDay = getFirstDayOfMonth(year, month);
    const daysInMonth = getDaysInMonth(year, month);

    const moodMap: Record<number, Mood> = {};
    moods.forEach((mood) => {
      const day = getDayOfMonth(mood.dateLogged);
      moodMap[day] = mood;
    });

    return { firstDay, daysInMonth, moodMap };
  }, [moods]);

  const renderCalendar = () => {
    const { firstDay, daysInMonth, moodMap } = calendarData;
    const cells = [];

    for (let i = 0; i < firstDay; i++) {
      cells.push(<View key={`empty-${i}`} style={styles.emptyCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      cells.push(<CalendarDay key={day} day={day} mood={moodMap[day]} />);
    }

    return cells;
  };

  return <View style={styles.grid}>{renderCalendar()}</View>;
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 4,
  },
  emptyCell: {
    width: 40,
    height: 40,
  },
});
