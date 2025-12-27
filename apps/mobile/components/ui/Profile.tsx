import { profile } from "@/styles/profile.styles";
import { theme } from "@/theme/theme";
import { formatDate } from "@/utils/formatDate";
import { Feather } from "@expo/vector-icons";
import { User } from "@moodly/core";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
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

  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <View style={profile.card}>
      <View style={{ position: "relative", height: 64, width: 64 }}>
        <Avatar.Image
          size={64}
          source={{ uri: image }}
          onLoadEnd={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />

        {isImageLoading && (
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "#ffffff",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: theme.colors.primary,
            }}
          >
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
      </View>
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
