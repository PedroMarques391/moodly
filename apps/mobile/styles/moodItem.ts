import { StyleSheet } from "react-native";

export const moodItem = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },

  heroSection: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  emojiCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  emoji: {
    fontSize: 50,
  },
  dateText: {
    fontSize: 16,
    color: "#666666",
    textTransform: "capitalize",
    marginBottom: 8,
  },
  ratingBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0284C7",
    textTransform: "uppercase",
  },

  contentCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333333",
  },
});
