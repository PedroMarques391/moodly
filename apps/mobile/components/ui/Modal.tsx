import { User } from "@moodly/core";
import { Modal as PaperModal, Portal, Text } from "react-native-paper";

type ModalProps = Pick<User, "name" | "email" | "image"> & {
  visible: boolean;
  onDismiss: () => void;
};

export default function Modal({
  visible,
  onDismiss,
}: ModalProps): React.JSX.Element {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  };
  return (
    <Portal>
      <PaperModal
        visible={visible}
        onDismiss={onDismiss}
        dismissable
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </PaperModal>
    </Portal>
  );
}
