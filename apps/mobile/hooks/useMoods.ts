import { useMoodStore } from "@/store/mood.store";
import { getItem } from "@/utils/storage";
import { CreateMoodDTO } from "@moodly/core";
import { useCallback } from "react";

export default function useMoods() {
  const { setError, setIsLoading, setMood } = useMoodStore.getState();

  const urlBase = "http://192.168.2.59:3000/api/v1/mood/";

  const getMoods = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = await getItem("token");

    try {
      const response = await fetch(urlBase, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch moods");
      }

      const data = await response.json();
      console.log("Fetched moods:", data);
      setMood(data);
    } catch (error) {
      console.error("Error fetching moods:", error);
      setError((error as Error).message);
      setMood([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [setError, setIsLoading, setMood]);

  const createMood = async (data: CreateMoodDTO) => {
    setIsLoading(true);
    setError(null);
    const token = await getItem("token");

    try {
      if (!token) {
        throw new Error("Operation unauthorized");
      }

      const response = await fetch(urlBase, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create mood");
      }

      await getMoods();

      return { success: true };
    } catch (error) {
      console.error("Error creating mood:", error);
      setError((error as Error).message);
      return { success: false, error: (error as Error).message };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getMoods,
    createMood,
  };
}
