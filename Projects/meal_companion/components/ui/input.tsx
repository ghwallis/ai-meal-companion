import { TextInput, View, Text, TextInputProps, Pressable } from "react-native";
import { useState } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
}

/**
 * Reusable Input Component
 *
 * Features:
 * - Optional label
 * - Error state with message
 * - Consistent styling
 * - Accessibility support
 */
export function Input({
  label,
  error,
  containerClassName,
  inputClassName,
  placeholderTextColor,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const colors = useColors();
  const [isFocused, setIsFocused] = useState(false);
  const borderScale = useSharedValue(1);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    borderScale.value = withSpring(1.02, {
      damping: 15,
      stiffness: 150,
    });
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    borderScale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    onBlur?.(e);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: borderScale.value }],
  }));

  return (
    <View className={cn("gap-2", containerClassName)}>
      {label && (
        <Text className="text-sm font-semibold text-foreground">{label}</Text>
      )}
      <Animated.View style={animatedStyle}>
        <TextInput
          placeholderTextColor={placeholderTextColor || colors.muted}
          className={cn(
            "bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground",
            error && "border-error",
            inputClassName
          )}
          style={{
            borderColor: isFocused ? colors.primary : (error ? colors.error : colors.border),
            color: colors.foreground,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </Animated.View>
      {error && (
        <Text className="text-xs text-error">{error}</Text>
      )}
    </View>
  );
}
