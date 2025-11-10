import Login from "@/components/screens/Login";
import SignIn from "@/components/screens/SignIn";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./auth.styles";

const AuthPage = (): React.JSX.Element => {
  const [screen, setScreen] = useState<"signin" | "login">("signin");

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo3.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
            {screen === "signin" ? <SignIn /> : <Login />}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => setScreen(screen === "login" ? "signin" : "login")}
      >
        <Text style={styles.switchText}>
          {screen === "login"
            ? "Não tem conta? Crie em 1 minuto!"
            : "Já tem conta? Fazer login"}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default AuthPage;
