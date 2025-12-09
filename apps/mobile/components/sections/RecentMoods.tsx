import MoodCard from "@/components/ui/MoodCard";
import styles from "@/styles/home.styles";
import { Mood } from "@moodly/core";
import React from "react";
import { Text, View } from "react-native";

type RecentMoodsProps = {
  moods: Mood[];
  isLoading: boolean;
};

export function RecentMoods({ moods, isLoading }: RecentMoodsProps) {
  const displayList =
    isLoading && moods.length === 0 ? [null, null, null] : moods.slice(0, 3);

  return (
    <View style={{ gap: 16 }}>
      <Text style={styles.sectionTitle}>Minha Semana</Text>

      {displayList.map((mood, index) => (
        <MoodCard
          key={mood ? mood.id : `skeleton-${index}`}
          mood={mood}
          variant="list"
          isLoading={isLoading && mood === null}
        />
      ))}

      {!isLoading && moods.length === 0 && (
        <View
          style={{
            alignItems: "center",
            padding: 20,
            minHeight: 150,
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#888" }}>
            Nenhum registro encontrado.
          </Text>
          <Text style={{ fontSize: 14, color: "#AAA", marginTop: 4 }}>
            Comece a adicionar suas emoções.
          </Text>
        </View>
      )}
    </View>
  );
}
