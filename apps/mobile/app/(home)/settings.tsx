import JourneySection from "@/components/sections/JourneySection";
import Preferences from "@/components/sections/Preferences";
import SecuritySection from "@/components/sections/SecuritySection";
import * as ImagePicker from "expo-image-picker";

import Input from "@/components/ui/Input";
import ModalProfile from "@/components/ui/Modal";
import Picker from "@/components/ui/Picker";
import Profile from "@/components/ui/Profile";
import ProfileAvatar from "@/components/ui/ProfileAvatar";
import { useUsers } from "@/hooks/useUser";
import { Image } from "@/interfaces/image";
import { useUserStore } from "@/store/user.store";
import { settings } from "@/styles/settings.styles";
import { theme } from "@/theme/theme";
import { createFormData } from "@/utils/createFormData";
import { formatDate, formatTime } from "@/utils/formatDate";
import { UpdateData, updateSchema } from "@/validations/update.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Settings() {
  const { user } = useUserStore();
  const { logout: handleLogout, updateUser, uploadImage } = useUsers();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<Image>({
    name: "defaultAvatar.jpg",
    mimeType: "image/jpeg",
    uri: user?.image ?? "",
  });

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

    const formData = await createFormData(
      image.uri,
      image.mimeType,
      image.name
    );

    const { url } = await uploadImage(formData);

    const dataWithImage = {
      ...data,
      image: url,
    };

    const result = await updateUser(user.id, dataWithImage);
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

  const handleDismiss = () => {
    setShowModal(false);
    if (image.uri !== user.image) {
      setTimeout(() => {
        setImage({
          name: "defaultAvatar.jpg",
          mimeType: "image/jpeg",
          uri: user?.image ?? "",
        });
      }, 300);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageData: Image = {
        uri: result.assets[0].uri,
        name: result.assets[0].fileName ?? "defaultAvatar.jpg",
        mimeType: result.assets[0].type ?? "image/jpeg",
      };
      setImage(imageData);
    }
  };

  return (
    <>
      <Profile
        name={user.name}
        email={user.email}
        image={image.uri}
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
        onDismiss={handleDismiss}
        title="Editar Perfil"
        handleSubmit={handleSubmit(handleUpdate)}
      >
        <Text>{lastUpdated}</Text>

        <ProfileAvatar image={image.uri} pickImage={pickImage} />

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
