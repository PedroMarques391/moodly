import globals from "@/styles/globals";
import { SignInData, signInSchema } from "@/validations/signIn.shema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import Btn from "../ui/Button";
import Input from "../ui/Input";

const SignIn = (): React.JSX.Element => {
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
    <View style={globals.container}>
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

      <Btn
        mode="contained"
        style={{ marginTop: 10, width: "60%" }}
        onPress={handleSubmit(handleSignIn)}
        icon="account-plus"
      >
        Criar conta
      </Btn>
    </View>
  );
};

export default SignIn;
