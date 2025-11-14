import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/auth.store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import styles from "./home.styles";

export default function Home(): React.JSX.Element {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const hour: number = new Date().getHours();

  const greeting = useMemo(() => {
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, [hour]);

  const weeklyEmotions = ["😊", "😐", "😢", "😃", "😴", "😍", "🤔"];

  const fade: Animated.Value = useRef(new Animated.Value(0)).current;
  const translateY: Animated.Value = useRef(new Animated.Value(20)).current;
  const emojisOpacity: Animated.Value[] = useRef(
    weeklyEmotions.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.stagger(
        100,
        emojisOpacity.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
  }, [fade, translateY, emojisOpacity]);

  return (
    <View style={styles.homeContainer}>
      <Animated.View
        style={{
          opacity: fade,
          transform: [{ translateY }],
        }}
      >
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            {greeting}, {user?.name}
          </Text>
          <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
        </View>

        <Card mode="contained" style={styles.moodCard}>
          <Card.Content>
            <Text style={styles.cardTitle}>Seu humor de hoje</Text>
            <TouchableOpacity
              onPress={logout}
              activeOpacity={0.7}
              style={styles.moodButton}
            >
              <Text style={styles.moodEmoji}>😄</Text>
              <Text style={styles.moodText}>Registrar emoção</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <View style={styles.timeline}>
          <Text style={styles.sectionTitle}>Resumo da semana</Text>
          <View style={styles.emojiRow}>
            {weeklyEmotions.map((emoji, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.emojiBubble,
                  {
                    opacity: emojisOpacity[index],
                    transform: [{ scale: emojisOpacity[index] }],
                  },
                ]}
              >
                <Text style={styles.emoji}>{emoji}</Text>
              </Animated.View>
            ))}
          </View>
        </View>

        <Animated.View style={{ opacity: fade }}>
          <View style={styles.quoteContainer}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color="#888"
            />
            <Text style={styles.quote}>
              “Lembre-se: até os dias nublados fazem parte da paisagem.” ☁️
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
