import { useUserStore } from "@/store/user.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Image, TouchableOpacity } from "react-native";

export default function Layout() {
  const { user } = useUserStore();
  return (
    <Drawer
      screenOptions={{
        title: "",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push("/settings")}
            style={{ marginRight: 15 }}
          >
            <Image
              source={{ uri: user?.image }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Drawer.Screen
        name="dashboard"
        options={{
          drawerLabel: "Meus graficos",
          drawerIcon(props) {
            return (
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="moods"
        options={{
          drawerLabel: "Meus Moods",
          drawerIcon(props) {
            return (
              <MaterialCommunityIcons
                name="emoticon-happy"
                size={24}
                color={props.color}
              />
            );
          },
        }}
      />
    </Drawer>
  );
}
