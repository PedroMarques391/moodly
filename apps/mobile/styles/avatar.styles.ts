import { StyleSheet } from "react-native";

export const avatar = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  touchableArea: {
    position: "relative",
  },
  avatar: {
    backgroundColor: "#F0F0F0",
  },
  badge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});
