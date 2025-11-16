import { globals } from "@/styles/global.styles";
import { theme } from "@/theme/theme";
import { useState } from "react";
import { Switch } from "react-native";
import { Card, List } from "react-native-paper";

export default function Preferences() {
  const [isReminderOn, setIsReminderOn] = useState(true);

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
            onValueChange={setIsReminderOn}
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
