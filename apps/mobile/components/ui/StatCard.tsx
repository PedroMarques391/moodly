import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "#6366F1",
}: StatCardProps) {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
          <MaterialCommunityIcons name={icon} size={24} color={color} />
        </View>
        <Text variant="headlineMedium" style={styles.value}>
          {value}
        </Text>
        <Text variant="bodySmall" style={styles.title}>
          {title}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    backgroundColor: "#fff",
  },
  content: {
    alignItems: "center",
    paddingVertical: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  value: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    color: "#666",
    textTransform: "uppercase",
    fontSize: 11,
    fontWeight: "600",
  },
});
