import styles from "@/styles/home.styles";
import { Mood } from "@moodly/core";
import React from "react";
import { FlatList, Text, View } from "react-native";
import MoodCard from "../ui/MoodCard";
import ListEmptyComponent from "./ListEmptyComponent";

type RecentMoodsProps = {
  moods: Mood[];
  isLoading: boolean;
};

export function RecentMoods({ moods, isLoading }: RecentMoodsProps) {
  return (
    <View style={{ gap: 16 }}>
      <Text style={styles.sectionTitle}>Minha Semana</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={moods}
        renderItem={({ item }) => (
          <MoodCard mood={item} variant="list" isLoading={isLoading} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={{ flexGrow: 1, gap: 12 }}
      />
    </View>
  );
}
