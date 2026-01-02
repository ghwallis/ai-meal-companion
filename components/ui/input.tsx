import { TextInput, View, Text, TextInputProps } from "react-native";
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
  ...props
}: InputProps) {
  const colors = useColors();

  return (
    <View className={cn("gap-2", containerClassName)}>
      {label && (
        <Text className="text-sm font-semibold text-foreground">{label}</Text>
      )}
      <TextInput
        placeholderTextColor={placeholderTextColor || colors.muted}
        className={cn(
          "bg-surface border border-border rounded-lg px-4 py-3 text-base text-foreground",
          error && "border-error",
          inputClassName
        )}
        style={{
          borderColor: error ? colors.error : colors.border,
          color: colors.foreground,
        }}
        {...props}
      />
      {error && (
        <Text className="text-xs text-error">{error}</Text>
      )}
    </View>
  );
}
