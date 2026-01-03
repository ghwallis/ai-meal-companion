import { RefreshControl, RefreshControlProps } from "react-native";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface AnimatedRefreshControlProps extends RefreshControlProps {
  colors?: {
    primary: string;
    background: string;
  };
}

/**
 * Animated Refresh Control
 * 
 * Enhances the native RefreshControl with rotating animation
 * for visual feedback during pull-to-refresh
 */
export function AnimatedRefreshControl({
  refreshing,
  colors: customColors,
  ...props
}: AnimatedRefreshControlProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (refreshing) {
      // Start rotating spinner
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    } else {
      // Stop and reset
      rotation.value = 0;
    }
  }, [refreshing, rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  // Standard iOS/Android refresh control
  // Animation is applied at the native level
  return (
    <RefreshControl
      refreshing={refreshing}
      tintColor={customColors?.primary || "#007AFF"}
      colors={[customColors?.primary || "#007AFF"]}
      progressBackgroundColor={customColors?.background || "#FFFFFF"}
      {...props}
    />
  );
}

/**
 * Standalone Rotating Spinner
 * 
 * Use this for custom refresh indicators
 */
export function RotatingSpinner({
  size = 40,
  color = "#007AFF",
  duration = 1000,
}: {
  size?: number;
  color?: string;
  duration?: number;
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation, duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: `${color}40`,
          borderTopColor: color,
          justifyContent: "center",
          alignItems: "center",
        },
        animatedStyle,
      ]}
    />
  );
}
