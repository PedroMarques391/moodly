import { theme } from "@/theme/theme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavigation, Provider } from "react-native-paper";
import Dashboard from "./dashboard";
import Home from "./home";
import Settings from "./settings";
interface IRouter {
  key: string;
  title: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
}

export default function HomeLayout() {
  const [index, setIndex] = useState(0);

  const routes: IRouter[] = [
    { key: "dashboard", title: "Dashboard", icon: "graph" },
    { key: "home", title: "Home", icon: "home" },
    { key: "settings", title: "Settings", icon: "cog" },
  ];

  const renderScene = ({ route }: { route: IRouter }) => {
    switch (route.key) {
      case "home":
        return <Home />;
      case "settings":
        return <Settings />;
      case "dashboard":
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.content}>
          {renderScene({ route: routes[index] })}
        </View>

        <BottomNavigation.Bar
          style={{
            position: "absolute",
            bottom: 0,
            backgroundColor: theme.colors.primaryLight,
          }}
          navigationState={{ index, routes }}
          activeColor={theme.colors.textPrimary}
          inactiveColor={theme.colors.textSecondary}
          activeIndicatorStyle={{ backgroundColor: theme.colors.primary }}
          onTabPress={({ route }) => {
            const newIndex = routes.findIndex((r) => r.key === route.key);
            if (newIndex !== -1) {
              setIndex(newIndex);
            }
          }}
          renderIcon={({ route, color, focused }) => (
            <MaterialCommunityIcons
              name={route.icon}
              size={focused ? 28 : 24}
              color={color}
            />
          )}
          getLabelText={({ route }) => route.title}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
