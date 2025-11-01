import { Link } from "expo-router";
import { Text, View } from "react-native";

const HomePage = (): React.JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link href="/auth">
        <Text>Go to Auth Home Screen</Text>
      </Link>
      <Link href="/home">
        <Text> Home Screen</Text>
      </Link>
    </View>
  );
};

export default HomePage;
