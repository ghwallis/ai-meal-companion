import { View, ViewProps, Pressable } from "react-native";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { cn } from "@/lib/utils";

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
}

/**
 * Reusable Card Component
 *
 * Variants:
 * - default: Standard card with border
 * - elevated: Card with shadow effect
 * - outlined: Card with only border, no background
 */
export function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) {
  const scale = useSharedValue(1);
  const [isPressed, setIsPressed] = useState(false);

  const variantClasses = {
    default: "bg-surface border border-border rounded-2xl",
    elevated: "bg-surface border border-border rounded-2xl shadow-lg",
    outlined: "bg-transparent border border-border rounded-2xl",
  };

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.98, {
      damping: 15,
      stiffness: 150,
    });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => ({
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <View
          className={cn(variantClasses[variant], "p-6", className)}
          {...props}
        >
          {children}
        </View>
      </Pressable>
    </Animated.View>
  );
}
