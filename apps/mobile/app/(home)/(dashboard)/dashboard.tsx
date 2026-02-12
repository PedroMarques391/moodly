import MoodCalendar from "@/components/sections/MoodCalendar";
import MoodChart from "@/components/sections/MoodChart";
import StatCard from "@/components/ui/StatCard";
import useMoods from "@/hooks/useMoods";
import { useMoodStore } from "@/store/mood.store";
import {
  calculateAverage,
  calculateStreak,
  getCurrentMonthMoods,
  getMoodsByPeriod,
  getMostFrequentEmoji,
  getTotalMoods,
} from "@/utils/moodStats";
import React, { useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function Dashboard() {
  const { getMoods } = useMoods();
  const { mood: moods, isLoading } = useMoodStore();

  useEffect(() => {
    getMoods();
  }, [getMoods]);

  const stats = useMemo(() => {
    const total = getTotalMoods(moods);
    const streak = calculateStreak(moods);
    const average = calculateAverage(moods);
    const topEmoji = getMostFrequentEmoji(moods);

    return { total, streak, average, topEmoji };
  }, [moods]);

  const last7Days = useMemo(() => getMoodsByPeriod(moods, 7), [moods]);
  const currentMonthMoods = useMemo(() => getCurrentMonthMoods(moods), [moods]);

  if (isLoading && moods.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Dashboard
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Acompanhe sua jornada emocional
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Total"
          value={stats.total}
          icon="chart-line"
          color="#6366F1"
        />
        <StatCard
          title="Sequência"
          value={`${stats.streak}d`}
          icon="fire"
          color="#F59E0B"
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard
          title="Média"
          value={stats.average.toFixed(1)}
          icon="heart"
          color="#EC4899"
        />
        <StatCard
          title="Top"
          value={stats.topEmoji}
          icon="emoticon-happy"
          color="#10B981"
        />
      </View>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Humor nos últimos 7 dias
          </Text>
          <MoodChart moods={last7Days} days={7} />
        </Card.Content>
      </Card>

      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.cardTitle}>
            Calendário do Mês
          </Text>
          <MoodCalendar moods={currentMonthMoods} />
        </Card.Content>
      </Card>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    color: "#666",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
});
