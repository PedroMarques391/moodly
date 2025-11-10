import { theme } from "@/theme/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-start",
  },

  logoContainer: {
    width: "100%",
    height: height * 0.4,
  },

  switchButton: {
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    bottom: 0,
    marginBottom: Platform.OS === "ios" ? 40 : 20,
    position: "absolute",
  },

  switchText: {
    color: theme.colors.primaryDark,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    textAlign: "center",
  },
});

export default styles;
