import { useAuthStore } from "@/store/auth.store";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}
