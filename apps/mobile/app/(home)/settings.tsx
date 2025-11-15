import Modal from "@/components/ui/Modal";
import Profile from "@/components/ui/Profile";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { View } from "react-native";

export default function Settings() {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState<boolean>(false);

  if (!user) return null;

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  return (
    <View>
      <Profile
        name={user.name}
        email={user.email}
        image={user.image}
        createdAt={user.createdAt}
        handleShowModal={handleShowModal}
      />
      <Modal
        name={user.name}
        email={user.email}
        image={user.image}
        visible={showModal}
        onDismiss={handleShowModal}
      />
    </View>
  );
}
