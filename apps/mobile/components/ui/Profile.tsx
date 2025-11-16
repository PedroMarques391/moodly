import { profile } from "@/styles/profile.styles";
import { theme } from "@/theme/theme";
import formatDate from "@/utils/formatDate";
import { Feather } from "@expo/vector-icons";
import { User } from "@moodly/core";
import { Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";

type ProfileProps = Pick<User, "name" | "email" | "image" | "createdAt"> & {
  handleShowModal: () => void;
};

export default function Profile({
  name,
  email,
  image,
  createdAt,
  handleShowModal,
}: ProfileProps): React.JSX.Element {
  const creationDate = formatDate(createdAt);

  return (
    <View style={profile.card}>
      <Avatar.Image size={64} source={{ uri: image }} />
      <View style={profile.textContainer}>
        <Text style={profile.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={profile.email} numberOfLines={1}>
          {email}
        </Text>
        <Text style={profile.date}>Membro desde: {creationDate}</Text>
      </View>

      <TouchableOpacity onPress={handleShowModal} style={profile.iconButton}>
        <Feather name="edit" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
