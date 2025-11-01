import globals from "@/styles/globals";
import { LoginData, loginScheme } from "@/validations/login.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Btn from "../ui/Button";
import Input from "../ui/Input";

const Login = (): React.JSX.Element => {
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
    <View style={globals.container}>
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

      <Btn
        mode="contained"
        style={{ marginTop: 10, width: "60%" }}
        onPress={handleSubmit(handleLogin)}
        icon="login"
      >
        Acessar
      </Btn>
    </View>
  );
};

export default Login;
