import { useUsers } from "@/hooks/useUser";
import { globals } from "@/styles/global.styles";
import { journey } from "@/styles/journey.styles";
import { stringToArray } from "@/utils/stringToArray";
import { User } from "@moodly/core";
import { useState } from "react";
import { Card, List, Text, TextInput, useTheme } from "react-native-paper";

interface JourneySectionProps {
  user: Partial<User>;
}

export default function JourneySection({ user }: JourneySectionProps) {
  const { updateUser } = useUsers();
  const [bio, setBio] = useState<string>("");
  const theme = useTheme();

  if (!user) return null;

  const goals = stringToArray(user.goals ?? "");

  async function handleSave(bioText: string) {
    if (!bioText || bioText.trim() === "") {
      return;
    }
    const result = await updateUser(user?.id!, { bio: bioText });
    if (!result.success) {
      throw new Error(result.error);
    }
    setBio("");
  }

  return (
    <Card style={[journey.card, { backgroundColor: theme.colors.surface }]}>
      <List.Subheader style={globals.subheader}>Minha Jornada</List.Subheader>
      <Card.Content>
        <Text style={[journey.label, { color: theme.colors.onSurfaceVariant }]}>
          Bio
        </Text>
        {user.bio ? (
          <Text style={journey.bioText}>{user.bio}</Text>
        ) : (
          <TextInput
            mode="flat"
            value={bio}
            style={journey.bioInput}
            onChangeText={setBio}
            onBlur={async () => await handleSave(bio)}
            multiline
            placeholder="Adicione uma bio clicando aqui"
            right={
              <TextInput.Icon
                icon="check"
                onPress={async () => await handleSave(bio)}
              />
            }
          />
        )}

        {goals.length > 0 && (
          <>
            <Text
              style={[
                journey.label,
                { color: theme.colors.onSurfaceVariant, marginTop: 16 },
              ]}
            >
              Meus Objetivos
            </Text>
            {goals.map((obj) => (
              <List.Item
                key={obj}
                title={obj}
                left={(props) => (
                  <List.Icon {...props} icon="check-circle-outline" />
                )}
                style={journey.objectiveItem}
              />
            ))}
          </>
        )}
      </Card.Content>
    </Card>
  );
}
