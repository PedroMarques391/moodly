import { theme as moodlyTheme } from "@/theme/theme";
import { Slot } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: moodlyTheme.colors.primary,
    secondary: moodlyTheme.colors.secondary,
    background: moodlyTheme.colors.background,
    surface: moodlyTheme.colors.surface,
    text: moodlyTheme.colors.textPrimary,
    placeholder: moodlyTheme.colors.textSecondary,
    error: moodlyTheme.colors.error,
  },
  roundness: moodlyTheme.radius.md,
};

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor: paperTheme.colors.background,
        }}
      >
        <StatusBar
          barStyle={"light-content"}
          networkActivityIndicatorVisible
          animated
        />
        <Slot />
      </View>
    </PaperProvider>
  );
}
