import useAnimated from "@/hooks/useAnimated";
import { SignInData, signInSchema } from "@/validations/signIn.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Animated from "react-native-reanimated";
import Input from "../ui/Input";

const SignIn = (): React.JSX.Element => {
  const { animatedStyle } = useAnimated("fadeInZoom");

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
  function handleSignIn(data: SignInData) {
    console.warn(data);
    reset();
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

      <Button
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
