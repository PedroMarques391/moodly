import { moodCard } from "@/styles/moodCard.styles";
import { formatDate } from "@/utils/formatDate";
import getMoodColor from "@/utils/getMoodColor";
import getMoodText from "@/utils/getMoodText";
import { View } from "react-native";

import { Text } from "react-native-paper";

type MoodCardProps = {
  mood: any;
  variant: "list" | "grid";
  onPressMenu?: () => void;
};

export default function MoodCard({
  mood,
  variant,
  onPressMenu,
}: MoodCardProps) {
  const color = getMoodColor(mood.rating);
  const title = getMoodText(mood.rating);

  const day = formatDate(mood.dateLogged).split("/")[0];
  const month = formatDate(mood.dateLogged).split("/")[1];

  return (
    <>
      {variant === "list" ? (
        <View style={[moodCard.listItemContainer, { backgroundColor: color }]}>
          <Text style={{ fontSize: 32, marginRight: 12 }}>{mood.emoji}</Text>
          <View style={moodCard.textContainer}>
            <Text style={moodCard.title}>{title}</Text>
            <Text style={moodCard.description} numberOfLines={1}>
              {mood.description}
            </Text>
          </View>

          <View style={moodCard.dateContainer}>
            <Text style={[moodCard.day, { color: color }]}>{day}</Text>
            <Text style={[moodCard.month, { color: color }]}>{month}</Text>
          </View>
        </View>
      ) : (
        <View>grid</View>
      )}
    </>
  );
}
