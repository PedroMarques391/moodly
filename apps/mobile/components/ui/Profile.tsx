import { User } from "@moodly/core";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// Importe o ícone da biblioteca que você usa (ex: expo ou react-native-vector-icons)
import { theme } from "@/theme/theme";
import formatDate from "@/utils/formatDate";
import { Feather } from "@expo/vector-icons";

// Criei um tipo de props para incluir uma função de clique no ícone
type ProfileProps = Omit<User, "password" | "id" | "updatedAt"> & {
  /** Função a ser chamada ao pressionar o ícone */
  onPressIcon?: () => void;
};

export default function Profile({
  name,
  email,
  image,
  createdAt,
  onPressIcon,
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

      <TouchableOpacity onPress={onPressIcon} style={styles.iconButton}>
        <Feather name="edit" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: theme.colors.primary,
    marginTop: 4,
  },
  iconButton: {
    padding: 4,
  },
});
