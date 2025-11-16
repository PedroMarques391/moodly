import JourneySection from "@/components/sections/JourneySection";
import Preferences from "@/components/sections/Preferences";
import SecuritySection from "@/components/sections/SecuritySection";
import Modal from "@/components/ui/Modal";
import Profile from "@/components/ui/Profile";
import { useRequests } from "@/hooks/useRequests";
import { useAuthStore } from "@/store/auth.store";
import { settings } from "@/styles/settings.styles";
import { theme } from "@/theme/theme";
import { useState } from "react";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";

export default function Settings() {
  const { user } = useAuthStore();
  const { logout: handleLogout } = useRequests();
  const [showModal, setShowModal] = useState<boolean>(false);

  if (!user) return null;

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

      <Modal user={user} visible={showModal} onDismiss={handleShowModal} />
    </>
  );
}
