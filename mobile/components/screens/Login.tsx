import useAnimated from "@/hooks/useAnimated";
import globals from "@/styles/globals";
import { LoginData, loginScheme } from "@/validations/login.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "react-native-paper";
import Animated from "react-native-reanimated";
import Input from "../ui/Input";

const Login = (): React.JSX.Element => {
  const { animatedStyle } = useAnimated("fadeInZoom");
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

  function handleLogin(data: LoginData) {
    reset();
  }

  return (
    <Animated.View style={[globals.container, animatedStyle]}>
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

      <Button
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
