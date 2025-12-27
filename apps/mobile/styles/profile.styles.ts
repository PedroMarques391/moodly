import { theme } from "@/theme/theme";
import { StyleSheet } from "react-native";

export const profile = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    gap: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: theme.colors.primary,
    marginTop: 4,
  },
  iconButton: {
    padding: 4,
  },
});
