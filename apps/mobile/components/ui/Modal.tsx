import { useUserStore } from "@/store/user.store";
import { modal } from "@/styles/modal.styles";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Button, Modal as PaperModal, Portal, Text } from "react-native-paper";

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title: string;
  handleSubmit?: () => void;
};

export default function Modal({
  visible,
  onDismiss,
  children,
  title,
  handleSubmit,
}: ModalProps): React.JSX.Element {
  const { isLoading } = useUserStore();

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
            {title}
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
            {children}
          </ScrollView>

          <View style={modal.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
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
