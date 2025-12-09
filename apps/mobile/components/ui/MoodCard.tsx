import { moodCard } from "@/styles/moodCard.styles";
import { formatDate } from "@/utils/formatDate";
import getMoodColor from "@/utils/getMoodColor";
import getMoodText from "@/utils/getMoodText";
import { Mood } from "@moodly/core";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { SkeletonItem } from "./Skeleton";

type MoodCardProps = {
  mood: Mood | null;
  variant: "list" | "grid";
  onPressMenu?: () => void;
  isLoading: boolean;
};

export default function MoodCard({
  mood,
  variant,
  onPressMenu,
  isLoading,
}: MoodCardProps) {
  if (isLoading && variant === "list") {
    return (
      <View
        style={[
          moodCard.listItemContainer,
          { backgroundColor: "#F5F5F5", alignItems: "center" },
        ]}
      >
        <SkeletonItem
          width={40}
          height={40}
          borderRadius={20}
          style={{ marginRight: 12 }}
        />

        <View
          style={[moodCard.textContainer, { justifyContent: "center", gap: 6 }]}
        >
          <SkeletonItem width={120} height={20} />
          <SkeletonItem width={180} height={14} />
        </View>

        <View style={moodCard.dateContainer}>
          <SkeletonItem width={40} height={40} borderRadius={8} />
        </View>
      </View>
    );
  }

  if (!mood) return null;

  const color = getMoodColor(mood.rating);
  const title = getMoodText(mood.rating);
  const date = formatDate(mood.dateLogged).split("/");
  const day = date[0];
  const month = date[1];

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
        <View>
          <Text>grid</Text>
        </View>
      )}
    </>
  );
}
