import Login from "@/components/screens/Login";
import SignIn from "@/components/screens/SignIn";
import { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./auth.styles";

const { height } = Dimensions.get("window");

const AuthPage = (): React.JSX.Element => {
  const [type, setType] = useState<"signin" | "login">("signin");

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo2.png")}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>

      <View style={styles.formContainer}>
        {type === "signin" ? <SignIn /> : <Login />}
      </View>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setType(type === "login" ? "signin" : "login")}
      >
        <Text style={styles.switchText}>
          {type === "login"
            ? "Não tem conta? Crie em 1 minuto!"
            : "Já tem conta? Fazer login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthPage;
