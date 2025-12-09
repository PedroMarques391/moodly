import useAnimated from "@/hooks/useAnimated";
import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/user.store";
import { LoginData, loginScheme } from "@/validations/login.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated from "react-native-reanimated";
import Input from "../ui/Input";

const Login = (): React.JSX.Element => {
  const [error, setError] = useState<string | undefined>(undefined);
  const { animatedStyle } = useAnimated("fadeInZoom");
  const { isLoading } = useUserStore();
  const { login } = useUsers();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>({
    resolver: zodResolver(loginScheme),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: LoginData) {
    const { email, password } = data;
    const result = await login(email, password);

    if (!result.success) {
      setError(result.error);
      setTimeout(() => setError(undefined), 2000);
      return;
    }
    reset();
    router.push("/(home)/home");
  }

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          gap: 10,
          alignItems: "center",
          paddingVertical: 20,
        },
      ]}
    >
      <Input
        name="email"
        placeholder="email@example.com"
        label="E-mail"
        mode="outlined"
        control={control}
        formError={errors.email?.message || ""}
      />
      <Input
        name="password"
        placeholder="*******"
        label="Senha"
        mode="outlined"
        control={control}
        formError={errors.password?.message}
      />
      {error && (
        <View
          style={{
            alignItems: "center",
            backgroundColor: "red",
            padding: 10,
            width: "70%",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {error}
          </Text>
        </View>
      )}
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        style={{ marginTop: 10, width: "60%" }}
        onPress={handleSubmit(handleLogin)}
        icon="login"
      >
        Acessar
      </Button>
    </Animated.View>
  );
};

export default Login;
