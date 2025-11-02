import { useEffect } from "react";
import {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

type AnimationType =
  | "slideDown"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "fadeIn"
  | "fadeInZoom"
  | "bounce"
  | "pop";

export default function useAnimated(type: AnimationType = "slideDown") {
  const translateX = useSharedValue(0);
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
      case "slideLeft":
        translateX.value = -80;
        break;
      case "slideRight":
        translateX.value = 80;
        break;
      case "fadeInZoom":
        scale.value = 0.8;
        break;
      case "bounce":
        scale.value = 0.6;
        break;
      case "pop":
        scale.value = 0.5;
        break;
    }

    if (type === "bounce") {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSequence(
        withSpring(1.15, { damping: 5, stiffness: 150 }),
        withSpring(1, { damping: 8, stiffness: 120 })
      );
    } else if (type === "pop") {
      opacity.value = withTiming(1, { duration: 400 });
      scale.value = withSequence(
        withTiming(1.1, { duration: 300 }),
        withTiming(1, { duration: 200 })
      );
    } else {
      translateY.value = withTiming(0, { duration: 600 });
      translateX.value = withTiming(0, { duration: 600 });
      opacity.value = withTiming(1, { duration: 600 });
      scale.value = withTiming(1, { duration: 600 });
    }
  }, [type, translateX, translateY, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return { animatedStyle };
}
