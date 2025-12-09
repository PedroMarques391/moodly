import JourneySection from "@/components/sections/JourneySection";
import Preferences from "@/components/sections/Preferences";
import SecuritySection from "@/components/sections/SecuritySection";
import Input from "@/components/ui/Input";
import ModalProfile from "@/components/ui/Modal";
import Picker from "@/components/ui/Picker";
import Profile from "@/components/ui/Profile";
import { useUsers } from "@/hooks/useUser";
import { useUserStore } from "@/store/user.store";
import { settings } from "@/styles/settings.styles";
import { theme } from "@/theme/theme";
import { formatDate, formatTime } from "@/utils/formatDate";
import { UpdateData, updateSchema } from "@/validations/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Avatar, Button, Text } from "react-native-paper";

export default function Settings() {
  const { user } = useUserStore();
  const { logout: handleLogout, updateUser } = useUsers();
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateData>({
    resolver: zodResolver(updateSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user?.name,
      bio: user?.bio ?? "",
      triggers: user?.triggers ?? "",
      goals: user?.goals ?? "",
      copingStrategies: user?.copingStrategies ?? "",
      baselineMood: user?.baselineMood ?? "neutral",
    },
  });

  useEffect(() => {
    reset({
      name: user?.name,
      bio: user?.bio ?? "",
      triggers: user?.triggers ?? "",
      goals: user?.goals ?? "",
      copingStrategies: user?.copingStrategies ?? "",
      baselineMood: user?.baselineMood ?? "neutral",
    });
  }, [user, reset]);

  if (!user) return;

  async function handleUpdate(data: UpdateData) {
    if (!user) return;
    const result = await updateUser(user.id, data);
    if (result.success) {
      setShowModal(false);
    }
  }

  const lastUpdated =
    "Última atualização: " +
    formatDate(user.updatedAt) +
    " às " +
    formatTime(user.updatedAt);

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <Profile
        name={user.name}
        email={user.email}
        image={user.image}
        createdAt={user.createdAt}
        handleShowModal={handleShowModal}
      />
      <ScrollView
        style={[
          settings.container,
          { backgroundColor: theme.colors.background },
        ]}
        contentContainerStyle={settings.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <JourneySection user={user} />
        <Preferences />
        <SecuritySection />
        <Button
          icon="logout"
          mode="contained"
          onPress={handleLogout}
          style={{
            backgroundColor: "#f7caca",
          }}
          labelStyle={{ color: theme.colors.error, fontWeight: "bold" }}
        >
          Sair da conta
        </Button>
      </ScrollView>

      <ModalProfile
        visible={showModal}
        onDismiss={handleShowModal}
        title="Editar Perfil"
        handleSubmit={handleSubmit(handleUpdate)}
      >
        <Text>{lastUpdated}</Text>
        <Avatar.Image size={100} source={{ uri: user.image }} />

        <Input
          label="Nome"
          name="name"
          placeholder="Como quer ser chamado?"
          control={control}
          formError={errors.name?.message}
        />

        <Input
          label="Bio"
          name="bio"
          placeholder="Conte algo sobre você"
          control={control}
          formError={errors.bio?.message}
          multiline
        />

        <Input
          label="Gatilhos"
          name="triggers"
          placeholder="Ex: estresse, barulho..."
          control={control}
          formError={errors.triggers?.message}
          multiline
        />

        <Input
          label="Objetivos"
          name="goals"
          placeholder="Ex: dormir melhor..."
          control={control}
          formError={errors.goals?.message}
          multiline
        />

        <Input
          label="Estratégias de enfrentamento"
          name="copingStrategies"
          placeholder="Ex: meditação, pausas..."
          control={control}
          formError={errors.copingStrategies?.message}
          multiline
        />

        <Picker
          control={control}
          name="baselineMood"
          label="Seu humor base"
          items={[
            { label: "Selecione...", value: "" },
            { label: "Muito para baixo", value: "very_low" },
            { label: "Para baixo", value: "low" },
            { label: "Neutro", value: "neutral" },
            { label: "Bem", value: "good" },
            { label: "Muito bem", value: "very_good" },
          ]}
        />
      </ModalProfile>
    </>
  );
}
