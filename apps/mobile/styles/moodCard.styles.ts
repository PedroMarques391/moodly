import { theme } from "@/theme/theme";
import { StyleSheet } from "react-native";

export const moodCard = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.textPrimary,
  },
  dateContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
  },
  day: {
    fontSize: 14,
    fontWeight: "bold",
  },
  month: {
    fontSize: 10,
    textTransform: "uppercase",
    marginTop: -2,
  },
  gridContainer: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 20,
    padding: 12,
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },

  infoContainer: {
    justifyContent: "flex-end",
  },
  gridTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowRadius: 2,
  },
});
