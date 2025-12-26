import useMoods from "@/hooks/useMoods";
import { useMoodStore } from "@/store/mood.store";
import { moodItem } from "@/styles/moodItem";
import { theme } from "@/theme/theme";
import { formatCompleteDate } from "@/utils/formatDate";
import getMoodText from "@/utils/getMoodText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export default function MoodItem() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const { mood: moods } = useMoodStore();
  const { deleteMood } = useMoods();

  const mood = useMemo(() => {
    return moods.find((m) => m.id === params.id);
  }, [params.id, moods]);

  if (!mood) {
    return (
      <View style={moodItem.centerContainer}>
        <Text style={{ marginBottom: 10 }}>Registro não encontrado.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#007AFF" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  async function confirmDelete() {
    if (!mood) return;

    const response = await deleteMood(mood.id);

    if (response.error) {
      console.error("Erro ao deletar o mood:", response.error);
      return;
    }

    router.back();
  }

  return (
    <Portal.Host>
      <View style={moodItem.container}>
        <ScrollView
          contentContainerStyle={moodItem.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={moodItem.heroSection}>
            <View
              style={[moodItem.emojiCircle, { backgroundColor: "#F3F4F6" }]}
            >
              <Text style={moodItem.emoji}>{mood.emoji}</Text>
            </View>

            <Text style={moodItem.dateText}>
              {formatCompleteDate(mood.dateLogged)}
            </Text>

            <View style={moodItem.ratingBadge}>
              <Text style={moodItem.ratingText}>
                {getMoodText(mood.rating)}
              </Text>
            </View>
          </View>

          <View style={moodItem.contentCard}>
            <View style={moodItem.cardHeader}>
              <MaterialCommunityIcons
                name="notebook-outline"
                size={20}
                color="#666"
              />
              <Text style={moodItem.cardLabel}>Diário</Text>
            </View>

            <Text style={moodItem.descriptionText}>{mood.description}</Text>
            <View
              style={{
                flex: 1,
                borderTopColor: "#F0F0F0",
                borderTopWidth: 1,
                marginTop: 10,
                paddingTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  backgroundColor: "#F5F7FA",
                  borderRadius: 12,
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={20}
                  color={theme.colors.primary}
                />
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={showDialog}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  backgroundColor: "#FEF2F2",
                  borderRadius: 12,
                  gap: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color="#FF3B30"
                />
                <Text
                  style={{
                    color: "#FF3B30",
                    fontWeight: "600",
                    fontSize: 15,
                  }}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: theme.colors.surface }}
          >
            <Dialog.Title>Excluir Registro</Dialog.Title>
            <Dialog.Content>
              <Text>
                Tem certeza que deseja excluir? Essa ação não pode ser desfeita.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog} textColor="#666">
                Cancelar
              </Button>
              <Button onPress={confirmDelete} textColor="#FF3B30">
                Excluir
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Portal.Host>
  );
}
