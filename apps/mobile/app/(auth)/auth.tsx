import Login from "@/components/screens/Login";
import SignIn from "@/components/screens/SignIn";
import { auth } from "@/styles/auth.styles";
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

const AuthPage = (): React.JSX.Element => {
  const [screen, setScreen] = useState<"signin" | "login">("signin");

  return (
    <View style={auth.container}>
      <KeyboardAvoidingView
        style={{ flexShrink: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={auth.container}>
            <View style={auth.logoContainer}>
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
        style={auth.switchButton}
        onPress={() =>
          setScreen((prev) => (prev === "login" ? "signin" : "login"))
        }
      >
        <Text style={auth.switchText}>
          {screen === "login"
            ? "Não tem conta? Crie em 1 minuto!"
            : "Já tem conta? Fazer login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthPage;
