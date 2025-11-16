import { theme } from "@/theme/theme";
import { StyleSheet } from "react-native";

export const journey = StyleSheet.create({
  card: {
    borderRadius: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  objectiveItem: {
    paddingVertical: 4,
  },
  bioInput: {
    backgroundColor: theme.colors.surface,
    height: 40,
  },
});
