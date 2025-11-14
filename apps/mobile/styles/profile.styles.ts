import { theme } from "@/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#eee",
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
