import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    width: "100%",
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    width: "100%",
  },
  switchButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});
