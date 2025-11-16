import { globals } from "@/styles/global.styles";
import { theme } from "@/theme/theme";
import { getItem, saveItem } from "@/utils/storage";
import { useEffect, useState } from "react";
import { Switch } from "react-native";
import { Card, List } from "react-native-paper";

export default function Preferences() {
  const [isReminderOn, setIsReminderOn] = useState(false);

  useEffect(() => {
    async function fetchItem() {
      const storedValue = await getItem("isReminderOn");

      if (storedValue === "true") {
        return setIsReminderOn(true);
      }
      if (storedValue === "false") {
        return setIsReminderOn(false);
      }
    }
    fetchItem();
  }, []);

  async function handleToggleReminder() {
    const newValue = !isReminderOn;
    setIsReminderOn(newValue);

    try {
      await saveItem("isReminderOn", newValue.toString());
    } catch (error) {
      console.error("Falha ao salvar o lembrete:", error);
      setIsReminderOn(!newValue);
    }
  }
  return (
    <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 12 }}>
      <List.Subheader style={globals.subheader}>Preferências</List.Subheader>
      <List.Item
        title="Lembretes diários"
        description="Para registrar seu humor"
        left={(props) => <List.Icon {...props} icon="bell-outline" />}
        right={() => (
          <Switch
            value={isReminderOn}
            onValueChange={handleToggleReminder}
            style={{ marginRight: 8 }}
          />
        )}
      />
      <List.Item
        title="Personalizar horários"
        left={(props) => <List.Icon {...props} icon="clock-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
    </Card>
  );
}
