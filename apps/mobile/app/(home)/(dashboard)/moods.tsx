import ListEmptyComponent from "@/components/sections/ListEmptyComponent";
import MoodCard from "@/components/ui/MoodCard";
import { useMoodStore } from "@/store/mood.store";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function MoodsScreen() {
  const { mood: moods } = useMoodStore();

  return (
    <View style={styles.container}>
      <FlatList
        data={moods}
        keyExtractor={(item) => item.id}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          moods.length === 0 && { flex: 1, justifyContent: "center" },
        ]}
        renderItem={({ item }) => (
          <MoodCard mood={item} variant="grid" isLoading={false} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 10,
    paddingVertical: 20,
  },
  columnWrapper: {
    justifyContent: "center",
    gap: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
});
