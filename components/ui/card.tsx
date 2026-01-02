import { View, ViewProps } from "react-native";
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
  const variantClasses = {
    default: "bg-surface border border-border rounded-2xl",
    elevated: "bg-surface border border-border rounded-2xl shadow-lg",
    outlined: "bg-transparent border border-border rounded-2xl",
  };

  return (
    <View
      className={cn(variantClasses[variant], "p-6", className)}
      {...props}
    >
      {children}
    </View>
  );
}
