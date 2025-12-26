import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/user.store";
import { theme } from "@/theme/theme";
import { getItem } from "@/utils/storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { user } = useUserStore();
  const { getUser } = useUsers();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getItem("token");

        if (!token) {
          router.replace("/(auth)/auth");
          return;
        }

        if (!user) {
          await getUser();
        }

        router.replace("/(home)/home");
      } catch (error) {
        console.error("Erro na verificação inicial:", error);
        router.replace("/(auth)/auth");
      }
    };

    checkAuth();
  }, [user, getUser, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
