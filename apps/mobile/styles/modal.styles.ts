import { StyleSheet } from "react-native";

export const modal = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FCFCFC",
    borderRadius: 28,
    marginHorizontal: 20,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 20,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  keyboardView: {
    position: "relative",
    flexShrink: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 16,
    alignItems: "center",
    gap: 14,
  },

  buttonContainer: {
    marginTop: 16,
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
  },
  button: {
    width: "100%",
  },
});
