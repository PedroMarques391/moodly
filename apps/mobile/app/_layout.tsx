import { theme as moodlyTheme } from "@/theme/theme";
import { Stack } from "expo-router";
import React from "react";
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
  roundness: moodlyTheme.radius.sm,
};

export default function RootLayout() {
  return (
    <PaperProvider theme={paperTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
        <Stack.Screen
          name="mood/[id]"
          options={{
            presentation: "modal",
            title: "Detalhes",
            headerShown: true,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
