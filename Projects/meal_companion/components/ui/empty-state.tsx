import { View, Text, Pressable } from "react-native";
import { useColors } from "@/hooks/use-colors";

interface EmptyStateProps {
  icon: string;
  title: string;
  subtitle: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: any;
}

/**
 * Empty State Component
 * 
 * Displays contextual messaging when lists are empty
 * Features:
 * - Large emoji icon
 * - Title and subtitle
 * - Optional CTA button
 * - Consistent styling across app
 * 
 * Usage:
 * <EmptyState
 *   icon="🍽️"
 *   title="No Saved Recipes"
 *   subtitle="Start saving recipes to build your collection"
 *   action={{ label: "Browse Recipes", onPress: () => {} }}
 * />
 */
export function EmptyState({ icon, title, subtitle, action, style }: EmptyStateProps) {
  const colors = useColors();

  return (
    <View
      style={[
        {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 60,
          paddingHorizontal: 32,
        },
        style,
      ]}
    >
      {/* Icon */}
      <Text style={{ fontSize: 64, marginBottom: 16 }}>{icon}</Text>

      {/* Title */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.foreground,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        style={{
          fontSize: 14,
          color: colors.muted,
          textAlign: "center",
          marginBottom: action ? 24 : 0,
          lineHeight: 20,
        }}
      >
        {subtitle}
      </Text>

      {/* Action Button */}
      {action && (
        <Pressable
          onPress={action.onPress}
          style={({ pressed }) => ({
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            opacity: pressed ? 0.8 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
          })}
        >
          <Text
            style={{
              color: colors.background,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

/**
 * Empty State Variants for specific use cases
 */

export function SavedRecipesEmptyState({
  showFavoritesOnly,
  onBrowsePress,
}: {
  showFavoritesOnly: boolean;
  onBrowsePress: () => void;
}) {
  return (
    <EmptyState
      icon="🍽️"
      title={showFavoritesOnly ? "No Favorites Yet" : "No Saved Recipes"}
      subtitle={
        showFavoritesOnly
          ? "Mark recipes as favorites to see them here"
          : "Start saving recipes to build your collection"
      }
      action={!showFavoritesOnly ? { label: "Browse Recipes", onPress: onBrowsePress } : undefined}
    />
  );
}

export function MealHistoryEmptyState({
  dateFilter,
  onIdentifyPress,
}: {
  dateFilter: string;
  onIdentifyPress: () => void;
}) {
  const getMessage = () => {
    switch (dateFilter) {
      case "today":
        return "No meals tracked today yet";
      case "week":
        return "No meals tracked this week yet";
      default:
        return "No meals tracked yet";
    }
  };

  return (
    <EmptyState
      icon="📊"
      title={getMessage()}
      subtitle="Identify meals with your camera to start tracking nutrition"
      action={{ label: "Identify Meal", onPress: onIdentifyPress }}
    />
  );
}

export function ChatEmptyState({ onExamplePress }: { onExamplePress: () => void }) {
  return (
    <EmptyState
      icon="🤖"
      title="Hi! I'm your AI Chef"
      subtitle="Ask me anything about cooking, nutrition, or recipes"
      action={{ label: "See Example Questions", onPress: onExamplePress }}
    />
  );
}

export function FavoritesEmptyState() {
  const colors = useColors();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
        paddingHorizontal: 32,
      }}
    >
      <Text style={{ fontSize: 64, marginBottom: 16 }}>❤️</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.foreground,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No Favorites Yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.muted,
          textAlign: "center",
          lineHeight: 20,
        }}
      >
        Tap the heart icon on recipes to save your favorites
      </Text>
    </View>
  );
}

export function SearchEmptyState() {
  const colors = useColors();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
        paddingHorizontal: 32,
      }}
    >
      <Text style={{ fontSize: 64, marginBottom: 16 }}>🔍</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: colors.foreground,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No Results Found
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: colors.muted,
          textAlign: "center",
          lineHeight: 20,
        }}
      >
        Try searching with different ingredients or keywords
      </Text>
    </View>
  );
}

export function ErrorState({
  title = "Something went wrong",
  subtitle = "Please try again",
  onRetry,
}: {
  title?: string;
  subtitle?: string;
  onRetry: () => void;
}) {
  return (
    <EmptyState
      icon="⚠️"
      title={title}
      subtitle={subtitle}
      action={{ label: "Try Again", onPress: onRetry }}
    />
  );
}
