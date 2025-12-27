import { RecentMoods } from "@/components/sections/RecentMoods";
import { Calendar } from "@/components/ui/Calendar";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Picker from "@/components/ui/Picker";
import useMoods from "@/hooks/useMoods";
import { useMoodStore } from "@/store/mood.store";
import { useUserStore } from "@/store/user.store";
import styles from "@/styles/home.styles";
import { formatDate } from "@/utils/formatDate";
import { MoodData, moodSchema } from "@/validations/mood.scheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Animated, Platform, TouchableOpacity, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home(): React.JSX.Element {
  const { user } = useUserStore();
  const { getMoods, createMood } = useMoods();
  const { mood: moods, isLoading } = useMoodStore();

  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MoodData>({
    resolver: zodResolver(moodSchema),
    mode: "onSubmit",
    defaultValues: {
      rating: "neutral",
      description: "",
      emoji: "",
      dateLogged: date,
    },
  });

  useEffect(() => {
    async function fetchMoods() {
      await getMoods();
    }
    fetchMoods();
  }, [getMoods]);

  const greeting = useMemo(() => {
    const h = new Date().getHours();
    return h < 12 ? "Bom dia" : h < 18 ? "Boa tarde" : "Boa noite";
  }, []);

  const weeklyEmotions = useMemo(() => moods.map((m) => m.emoji), [moods]);

  const fade = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, translateY]);

  const handleCreateMood = async (data: MoodData) => {
    const res = await createMood({ ...data, dateLogged: date });
    if (res.success) {
      setShowModal(false);
      reset();
      setDate(new Date());
    }
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate) setDate(selectedDate);
    setShowCalendar(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset();
  };

  return (
    <View style={[styles.homeContainer, { paddingTop: insets.top }]}>
      <Animated.View style={{ opacity: fade, transform: [{ translateY }] }}>
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
            {!weeklyEmotions.length && (
              <Text style={{ color: "#666" }}>🤔 Nada por aqui</Text>
            )}
            {weeklyEmotions.slice(0, 7).map((emoji, index) => (
              <View key={index} style={styles.emojiBubble}>
                <Text style={styles.emoji}>{emoji}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>
            <MaterialCommunityIcons
              name="lightbulb-on-outline"
              size={20}
              color="#888"
            />
            “Até os dias nublados fazem parte da paisagem.” ☁️
          </Text>
        </View>
      </Animated.View>

      <View style={{ marginTop: 24 }}>
        <RecentMoods moods={moods} isLoading={isLoading} />
      </View>

      <Modal
        visible={showModal}
        onDismiss={handleCloseModal}
        title="Registrar Humor"
        handleSubmit={handleSubmit(handleCreateMood)}
      >
        <Picker
          control={control}
          name="rating"
          label="Humor"
          formError={errors.rating?.message}
          items={[
            { label: "Muito para baixo", value: "very_low" },
            { label: "Para baixo", value: "low" },
            { label: "Neutro", value: "neutral" },
            { label: "Bem", value: "good" },
            { label: "Muito bem", value: "very_good" },
          ]}
        />
        <Input
          control={control}
          name="description"
          label="Descrição"
          placeholder="O que aconteceu hoje?"
          formError={errors.description?.message}
        />
        <Input
          control={control}
          name="emoji"
          label="Emoji"
          placeholder="😄"
          formError={errors.emoji?.message}
        />

        <View style={{ marginTop: 10 }}>
          {Platform.OS === "android" ? (
            <Button
              onPress={() => setShowCalendar(true)}
              mode="outlined"
              icon="calendar"
            >
              <Calendar
                date={date}
                show={showCalendar}
                onChange={handleDateChange}
              />
              {formatDate(date)}
            </Button>
          ) : (
            <Calendar date={date} show={true} onChange={handleDateChange} />
          )}
        </View>
      </Modal>
    </View>
  );
}
