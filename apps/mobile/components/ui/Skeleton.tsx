import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const SkeletonItem = ({
  width,
  height,
  borderRadius = 4,
  style,
}: any) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#CCC", // Cor base do skeleton (ajuste pro seu tema)
          opacity,
        },
        style,
      ]}
    />
  );
};
