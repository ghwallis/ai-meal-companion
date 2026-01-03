import { View, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";
import { useEffect } from "react";

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
  animated?: boolean;
}

/**
 * Skeleton Loader Component
 * 
 * Creates an animated placeholder that shows while content is loading.
 * Features:
 * - Animated shimmer effect
 * - Customizable dimensions and shape
 * - Respects theme colors
 * - Accessibility friendly (not announced to screen readers)
 * 
 * Usage:
 * <Skeleton width={100} height={100} borderRadius={8} />
 * <Skeleton style={{ width: "100%", height: 60 }} />
 */
export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius = 4,
  style,
  animated = true,
}: SkeletonProps) {
  const colors = useColors();
  const shimmerPosition = useSharedValue(-100);

  useEffect(() => {
    if (!animated) return;

    // Start shimmer animation loop
    const animate = () => {
      shimmerPosition.value = withTiming(100, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      });

      // Reset position after animation completes
      setTimeout(() => {
        shimmerPosition.value = -100;
        animate();
      }, 1500);
    };

    animate();
  }, [animated, shimmerPosition]);

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shimmerPosition.value,
          [-100, 100],
          [-300, 300],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: colors.border,
          overflow: "hidden",
        },
        style,
      ]}
      accessible={false}
    >
      {animated && (
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
            },
            animatedShimmerStyle,
          ]}
        />
      )}
    </View>
  );
}

/**
 * SkeletonText Component
 * Creates a skeleton for text content
 * Useful for headlines and body text
 */
export function SkeletonText({
  lines = 1,
  width = "100%",
  height = 16,
  spacing = 8,
  style,
  animated = true,
}: SkeletonProps & {
  lines?: number;
  spacing?: number;
}) {
  return (
    <View>
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={{
            marginBottom: index < lines - 1 ? spacing : 0,
          }}
        >
          <Skeleton
            width={width}
            height={height}
            borderRadius={4}
            style={style}
            animated={animated}
          />
        </View>
      ))}
    </View>
  );
}

/**
 * SkeletonCard Component
 * Creates a skeleton for card layouts
 * Includes image, title, and description placeholders
 */
export function SkeletonCard({
  showImage = true,
  imageHeight = 150,
  style,
  animated = true,
}: {
  showImage?: boolean;
  imageHeight?: number;
  style?: ViewStyle;
  animated?: boolean;
}) {
  const colors = useColors();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: "hidden",
          padding: 12,
        },
        style,
      ]}
    >
      {/* Image Skeleton */}
      {showImage && (
        <Skeleton
          width="100%"
          height={imageHeight}
          borderRadius={8}
          style={{ marginBottom: 12 }}
          animated={animated}
        />
      )}

      {/* Title Skeleton */}
      <Skeleton
        width="70%"
        height={18}
        borderRadius={4}
        style={{ marginBottom: 8 }}
        animated={animated}
      />

      {/* Subtitle Skeleton */}
      <Skeleton
        width="50%"
        height={14}
        borderRadius={4}
        style={{ marginBottom: 12 }}
        animated={animated}
      />

      {/* Stats Row Skeleton */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Skeleton width="20%" height={12} borderRadius={4} animated={animated} />
        <Skeleton width="20%" height={12} borderRadius={4} animated={animated} />
        <Skeleton width="20%" height={12} borderRadius={4} animated={animated} />
      </View>
    </View>
  );
}

/**
 * SkeletonListItem Component
 * Creates a skeleton for list items
 * Includes left element, title, subtitle, and optional avatar
 */
export function SkeletonListItem({
  showAvatar = false,
  animated = true,
  style,
}: {
  showAvatar?: boolean;
  animated?: boolean;
  style?: ViewStyle;
}) {
  const colors = useColors();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingVertical: 8,
          backgroundColor: colors.background,
        },
        style,
      ]}
    >
      {/* Avatar Skeleton */}
      {showAvatar && (
        <Skeleton
          width={40}
          height={40}
          borderRadius={20}
          animated={animated}
        />
      )}

      {/* Content Skeleton */}
      <View style={{ flex: 1 }}>
        {/* Title */}
        <Skeleton
          width="80%"
          height={16}
          borderRadius={4}
          style={{ marginBottom: 6 }}
          animated={animated}
        />

        {/* Subtitle */}
        <Skeleton
          width="60%"
          height={12}
          borderRadius={4}
          animated={animated}
        />
      </View>

      {/* Right Element Skeleton (e.g., chevron) */}
      <Skeleton
        width={20}
        height={20}
        borderRadius={4}
        animated={animated}
      />
    </View>
  );
}

/**
 * SkeletonStats Component
 * Creates a skeleton for statistics cards
 */
export function SkeletonStats({
  count = 3,
  animated = true,
  style,
}: {
  count?: number;
  animated?: boolean;
  style?: ViewStyle;
}) {
  const colors = useColors();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          gap: 12,
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 12,
            alignItems: "center",
            gap: 8,
          }}
        >
          {/* Large number skeleton */}
          <Skeleton
            width={40}
            height={28}
            borderRadius={4}
            animated={animated}
          />

          {/* Label skeleton */}
          <Skeleton
            width="80%"
            height={12}
            borderRadius={4}
            animated={animated}
          />
        </View>
      ))}
    </View>
  );
}

/**
 * SkeletonPulse Component
 * Simple full-width skeleton for simple pulsing effect
 */
export function SkeletonPulse({
  width = "100%",
  height = 40,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  return (
    <Skeleton
      width={width}
      height={height}
      borderRadius={borderRadius}
      style={style}
      animated={true}
    />
  );
}
