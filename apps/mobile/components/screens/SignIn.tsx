import useAnimated from "@/hooks/useAnimated";
import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/user.store";
import { SignInData, signInSchema } from "@/validations/signIn.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import Animated from "react-native-reanimated";
import Input from "../ui/Input";

const SignIn = (): React.JSX.Element => {
  const [error, setError] = useState<string | undefined>(undefined);
  const { animatedStyle } = useAnimated("fadeInZoom");
  const { signIn } = useUsers();
  const { isLoading } = useUserStore();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  async function handleSignIn(data: SignInData) {
    const { name, email, password } = data;
    const result = await signIn(name, email, password);

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
        name="name"
        placeholder="Digite seu nome"
        label="Nome"
        mode="outlined"
        control={control}
        formError={errors.name?.message}
      />
      <Input
        name="email"
        placeholder="email@example.com"
        label="E-mail"
        mode="outlined"
        control={control}
        formError={errors.email?.message}
      />
      <Input
        name="password"
        placeholder="*******"
        label="Senha"
        mode="outlined"
        control={control}
        formError={errors.password?.message}
      />

      <Input
        name="confirmPassword"
        placeholder="*******"
        label="Confirmar Senha"
        mode="outlined"
        control={control}
        formError={errors.confirmPassword?.message}
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
        style={{ marginTop: 10, width: "50%" }}
        onPress={handleSubmit(handleSignIn)}
        icon="account-plus"
      >
        Criar conta
      </Button>
    </Animated.View>
  );
};

export default SignIn;
