import { theme } from "@/theme/theme";
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    marginTop: Platform.OS === "ios" ? 60 : 40,
  },
  greetingContainer: {
    width: "100%",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  moodCard: {
    width: "100%",
    backgroundColor: theme.colors.primaryLight,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 12,
  },
  moodButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
    paddingVertical: 12,
    borderRadius: 12,
  },
  moodEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  moodText: {
    fontSize: 16,
    color: "#3567D6",
    fontWeight: "600",
  },
  timeline: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },
  emojiRow: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
  },
  emojiBubble: {
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 12,
    padding: 8,
  },
  emoji: {
    fontSize: 22,
  },
  quoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 20,
  },
  quote: {
    fontSize: 14,
    color: "#777",
    flex: 1,
  },
});
export default styles;
