import { Pressable, Text } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

export interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

/**
 * Reusable Button Component
 *
 * Variants:
 * - primary: Filled button with primary color
 * - secondary: Filled button with secondary color
 * - outline: Outlined button with border
 * - ghost: Transparent button with text only
 *
 * Sizes:
 * - sm: Small button (py-2, px-3, text-sm)
 * - md: Medium button (py-3, px-4, text-base)
 * - lg: Large button (py-4, px-6, text-lg)
 */
export function Button({
  onPress,
  disabled = false,
  variant = "primary",
  size = "md",
  children,
  className,
  textClassName,
}: ButtonProps) {
  const colors = useColors();

  const sizeClasses = {
    sm: "py-2 px-3 rounded-lg",
    md: "py-3 px-4 rounded-lg",
    lg: "py-4 px-6 rounded-xl",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.muted;
    if (variant === "primary" || variant === "secondary") return colors.primary;
    if (variant === "outline" || variant === "ghost") return "transparent";
    return colors.primary;
  };

  const getTextColor = () => {
    if (variant === "primary" || variant === "secondary") return colors.background;
    if (variant === "outline") return disabled ? colors.muted : colors.primary;
    if (variant === "ghost") return disabled ? colors.muted : colors.foreground;
    return colors.background;
  };

  const getBorderColor = () => {
    if (variant === "outline") return disabled ? colors.muted : colors.primary;
    return undefined;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        backgroundColor: getBackgroundColor(),
        borderColor: getBorderColor(),
        borderWidth: variant === "outline" ? 1 : 0,
        opacity: pressed && !disabled ? 0.8 : disabled ? 0.5 : 1,
        transform: [{ scale: pressed && !disabled ? 0.97 : 1 }],
      })}
      className={cn(sizeClasses[size], "items-center justify-center", className)}
    >
      <Text
        className={cn(textSizeClasses[size], "font-semibold", textClassName)}
        style={{ color: getTextColor() }}
      >
        {children}
      </Text>
    </Pressable>
  );
}
