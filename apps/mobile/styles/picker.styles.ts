import { Platform, StyleSheet } from "react-native";

export const picker = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 2,
  },
  pickerContainer: {
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    height: 56,
    justifyContent: "center",
  },
  picker: {
    backgroundColor: "transparent",
    width: "100%",
    marginTop: Platform.OS === "android" ? -2 : 0,
  },
});
