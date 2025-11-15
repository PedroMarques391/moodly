import { styles } from "@/styles/profile.styles";
import { theme } from "@/theme/theme";
import formatDate from "@/utils/formatDate";
import { Feather } from "@expo/vector-icons";
import { User } from "@moodly/core";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ProfileProps = Omit<User, "password" | "id" | "updatedAt"> & {
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
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>
        <Text style={styles.date}>Membro desde: {creationDate}</Text>
      </View>

      <TouchableOpacity onPress={handleShowModal} style={styles.iconButton}>
        <Feather name="edit" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
