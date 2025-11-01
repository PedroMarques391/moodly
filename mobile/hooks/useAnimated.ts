import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimationType = "slideDown" | "slideUp" | "fadeInZoom";

export default function useAnimated(type: AnimationType = "slideDown") {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    switch (type) {
      case "slideDown":
        translateY.value = -50;
        break;
      case "slideUp":
        translateY.value = 50;
        break;
      case "fadeInZoom":
        scale.value = 0.8;
        break;
    }

    translateY.value = withTiming(0, { duration: 600 });
    opacity.value = withTiming(1, { duration: 600 });
    scale.value = withTiming(1, { duration: 600 });
  }, [type, translateY, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return { animatedStyle };
}
