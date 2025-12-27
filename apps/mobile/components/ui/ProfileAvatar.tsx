import { avatar } from "@/styles/avatar.styles";
import { theme } from "@/theme/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

interface ProfileAvatarProps {
  image: string;
  pickImage: () => Promise<void>;
}

export default function ProfileAvatar({
  image,
  pickImage,
}: ProfileAvatarProps) {
  const hasImage = image && image.length > 0;

  return (
    <View style={avatar.container}>
      <TouchableOpacity
        onPress={pickImage}
        activeOpacity={0.7}
        style={avatar.touchableArea}
      >
        {hasImage ? (
          <Avatar.Image
            size={140}
            source={{ uri: image }}
            style={avatar.avatar}
          />
        ) : (
          <Avatar.Icon
            size={140}
            icon="account"
            style={[avatar.avatar, { backgroundColor: "#E0E0E0" }]}
            color="#FFF"
          />
        )}

        <View style={[avatar.badge, { backgroundColor: theme.colors.primary }]}>
          <MaterialCommunityIcons name="camera-plus" size={20} color="#FFF" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
