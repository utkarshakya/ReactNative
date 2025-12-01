import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { useColors } from "../hooks/useColors";
import {
  useResponsiveHeight,
  useResponsiveWidth,
} from "../hooks/useResponsive";

const PulsePosterSkeleton = ({
  /**
   * Pass the height in percentage relative to the screen height.
   */
  relativeHeight,
  /**
   * For Landscape use 3/2 or 16/9
   *
   */
  relativeMargin = 1,
  relativeBorderRadius = 1,
  aspectRatio = 2 / 3,
}) => {
  const { Colors } = useColors();

  const opacity = useRef(new Animated.Value(0.6)).current;
  const backgroundColor = Colors.surface.surface1;
  const height = useResponsiveHeight(relativeHeight);
  const borderRadius = useResponsiveHeight(relativeBorderRadius);
  const margin = useResponsiveWidth(relativeMargin);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor,
        height,
        margin,
        borderRadius,
        aspectRatio,
      }}
    />
  );
};

export default PulsePosterSkeleton;
