import { useRequests } from "@/hooks/useRequests";
import { useAuthStore } from "@/store/auth.store";
import { modal } from "@/styles/modal.styles";
import { UpdateData, updateSchema } from "@/validations/update.schema";
import { Feather } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@moodly/core";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import {
  Avatar,
  Button,
  Modal as PaperModal,
  Portal,
  Text,
} from "react-native-paper";
import Input from "./Input";
import Picker from "./Picker";

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  user: Omit<User, "password">;
};

export default function Modal({
  visible,
  onDismiss,
  user,
}: ModalProps): React.JSX.Element {
  const { updateUser } = useRequests();
  const { isLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateData>({
    resolver: zodResolver(updateSchema),
    mode: "onSubmit",
    defaultValues: {
      name: user.name,
      bio: user.bio ?? "",
      triggers: user.triggers ?? "",
      goals: user.goals ?? "",
      copingStrategies: user.copingStrategies ?? "",
      baselineMood: user.baselineMood ?? "neutral",
    },
  });

  async function handleUpdate(data: UpdateData) {
    const result = await updateUser(user.id, data);
    if (result.success) {
      onDismiss();
    }
  }

  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        dismissable={!isLoading}
        contentContainerStyle={modal.modalContainer}
      >
        <KeyboardAvoidingView
          style={modal.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Text variant="titleLarge" style={modal.title}>
            Editar Perfil
          </Text>

          <Feather
            name="x-circle"
            size={24}
            color="red"
            style={modal.closeButton}
            onPress={onDismiss}
          />

          <ScrollView
            contentContainerStyle={modal.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
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
          </ScrollView>

          <View style={modal.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit(handleUpdate)}
              style={modal.button}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </PaperModal>
    </Portal>
  );
}
