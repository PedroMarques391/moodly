import { globals } from "@/styles/global.styles";
import { theme } from "@/theme/theme";
import { Card, List } from "react-native-paper";

export default function SecuritySection() {
  return (
    <Card style={{ backgroundColor: theme.colors.surface, borderRadius: 12 }}>
      <List.Subheader style={globals.subheader}>Segurança e App</List.Subheader>
      <List.Item
        title="Proteger com PIN/Biometria"
        left={(props) => <List.Icon {...props} icon="lock-outline" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
      <List.Item
        title="Aparência"
        description="Claro / Escuro / Sistema"
        left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        right={(props) => <List.Icon {...props} icon="chevron-right" />}
        onPress={() => {}}
      />
    </Card>
  );
}
