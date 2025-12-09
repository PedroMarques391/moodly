import Modal from "@/components/ui/Modal";
import MoodCard from "@/components/ui/MoodCard";
import { useAuthStore } from "@/store/auth.store";
import styles from "@/styles/home.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";

export default function Home(): React.JSX.Element {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const hour: number = new Date().getHours();

  const greeting = useMemo(() => {
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, [hour]);

  const moods = [
    {
      emoji: "😊",
      rating: "good",
      description: "Had a great day!",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😐",
      rating: "neutral",
      description: "Feeling a bit down.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😢",
      rating: "low",
      description: "Feeling a bit down.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "neutral",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
    {
      emoji: "😡",
      rating: "very_low",
      description: "Got frustrated with work.",
      createAt: new Date(),
      dateLogged: new Date(),
    },
  ];
  const weeklyEmotions = moods.map((mood) => {
    return mood.emoji;
  });

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
              onPress={() => setShowModal(true)}
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
            {!weeklyEmotions ||
              (weeklyEmotions.length === 0 && (
                <Text style={{ fontSize: 16, color: "#666" }}>
                  🤔 Nada por aqui
                </Text>
              ))}
            {weeklyEmotions.slice(0, 7).map((emoji, index) => (
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
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Minha Semana</Text>
        {(!moods || moods.length === 0) && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              minHeight: 150,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#888",
                textAlign: "center",
              }}
            >
              Nenhum registro encontrado.
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#AAA",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              Comece a adicionar suas emoções para vê-las aqui.
            </Text>
          </View>
        )}
        {moods.slice(0, 3).map((mood, index) => (
          <MoodCard key={index} mood={mood} variant="list" />
        ))}
      </ScrollView>

      <Modal
        visible={showModal}
        onDismiss={() => setShowModal(false)}
        title="Registrar Humor"
      >
        <Text>Conteúdo do modal de registrar humor</Text>
      </Modal>
    </View>
  );
}
