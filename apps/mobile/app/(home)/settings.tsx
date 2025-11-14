import Profile from "@/components/ui/Profile";
import { useAuthStore } from "@/store/auth.store";
import { View } from "react-native";

export default function Settings() {
  const { user } = useAuthStore();
  if (!user) return null;
  return (
    <View>
      <Profile
        name={user.name}
        email={user.email}
        image={user.image}
        createdAt={user.createdAt}
      />
    </View>
  );
}
