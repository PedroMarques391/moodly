import Login from "@/components/screens/Login";
import SignIn from "@/components/screens/SignIn";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AuthPage = (): React.JSX.Element => {
  const [type, setType] = useState<"signin" | "login">("signin");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo ao Moodly 🌙</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  divider: {
    height: 10,
    width: "100%",
    backgroundColor: "#c20000",
    marginVertical: 20,
  },
  formContainer: {
    width: "100%",
  },
  switchButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  switchText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
