import { View, Text } from "react-native";
import { cn } from "@/lib/utils";
import { useColors } from "@/hooks/use-colors";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Reusable Badge Component
 *
 * Variants:
 * - primary: Primary color badge
 * - secondary: Secondary color badge
 * - success: Success color badge
 * - warning: Warning color badge
 * - error: Error color badge
 *
 * Sizes:
 * - sm: Small badge
 * - md: Medium badge
 * - lg: Large badge
 */
export function Badge({
  children,
  variant = "primary",
  size = "md",
  className,
}: BadgeProps) {
  const colors = useColors();

  const variantColors = {
    primary: { bg: colors.primary, text: colors.background },
    secondary: { bg: colors.primary, text: colors.background },
    success: { bg: colors.success, text: colors.background },
    warning: { bg: colors.warning, text: colors.background },
    error: { bg: colors.error, text: colors.background },
  };

  const sizeClasses = {
    sm: "px-2 py-1 rounded",
    md: "px-3 py-1.5 rounded-md",
    lg: "px-4 py-2 rounded-lg",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const colors_variant = variantColors[variant];

  return (
    <View
      style={{ backgroundColor: colors_variant.bg }}
      className={cn(sizeClasses[size], "items-center justify-center", className)}
    >
      <Text
        style={{ color: colors_variant.text }}
        className={cn(textSizeClasses[size], "font-semibold")}
      >
        {children}
      </Text>
    </View>
  );
}
