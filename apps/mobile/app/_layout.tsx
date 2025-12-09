import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/user.store";
import { theme as moodlyTheme, theme } from "@/theme/theme";
import { getItem } from "@/utils/storage";
import { router, Slot } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
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
  const { user } = useUserStore();
  const { getUser } = useUsers();

  useEffect(() => {
    const fetch = async () => {
      const token = await getItem("token");
      if (!token) {
        router.replace("/(auth)/auth");
      }
      if (!user) {
        await getUser();
      }

      router.replace("/(home)/home");
    };

    fetch();
  }, [getUser, user]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
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
