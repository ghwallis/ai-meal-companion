import { ScrollView, Text, View, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

/**
 * Home Screen - AI Meal Companion
 *
 * Main entry point for the app featuring:
 * - Surprise Me button for quick recipe generation
 * - Quick access to Camera and Chat
 * - Recent meals and daily recommendations
 */
export default function HomeScreen() {
  const colors = useColors();
  const [recentMeals] = useState([
    { id: 1, name: "Chicken Tikka Masala", time: "2 hours ago" },
    { id: 2, name: "Pasta Carbonara", time: "Yesterday" },
    { id: 3, name: "Vegetable Stir Fry", time: "2 days ago" },
  ]);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-8">
          {/* Hero Section */}
          <View className="gap-3">
            <Text className="text-4xl font-bold text-foreground">What's for dinner?</Text>
            <Text className="text-base text-muted leading-relaxed">
              Get AI-powered meal ideas, cooking tips, and expert guidance
            </Text>
          </View>

          {/* Surprise Me Button */}
          <Pressable
            style={({ pressed }) => [{
              backgroundColor: colors.primary,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            }]}
            className="rounded-2xl p-6 items-center justify-center active:opacity-90"
          >
            <Text className="text-2xl font-bold text-background mb-2">🎲 Surprise Me</Text>
            <Text className="text-sm text-background opacity-90 text-center">
              Get a unique recipe with ingredients you have
            </Text>
          </Pressable>

          {/* Quick Actions */}
          <View className="flex-row gap-4">
            <Pressable
              style={({ pressed }) => [{
                flex: 1,
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-xl p-4 items-center justify-center border border-border"
            >
              <IconSymbol name="paperplane.fill" size={24} color={colors.primary} />
              <Text className="text-xs text-foreground mt-2 font-semibold">Camera</Text>
              <Text className="text-xs text-muted">Identify Meal</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [{
                flex: 1,
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-xl p-4 items-center justify-center border border-border"
            >
              <IconSymbol name="chevron.right" size={24} color={colors.primary} />
              <Text className="text-xs text-foreground mt-2 font-semibold">Chat</Text>
              <Text className="text-xs text-muted">Ask Chef</Text>
            </Pressable>
          </View>

          {/* Daily Recommendation */}
          <View className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 border border-primary/20">
            <Text className="text-sm font-semibold text-primary mb-2">Today's Recommendation</Text>
            <Text className="text-lg font-bold text-foreground mb-2">Mediterranean Quinoa Bowl</Text>
            <Text className="text-sm text-muted leading-relaxed mb-4">
              A light, nutritious meal perfect for your wellness journey. Ready in 20 minutes.
            </Text>
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-lg self-start">
              <Text className="text-sm font-semibold text-background">View Recipe</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Meals */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Recent Meals</Text>
            {recentMeals.map((meal) => (
              <Pressable
                key={meal.id}
                style={({ pressed }) => [{
                  opacity: pressed ? 0.7 : 1,
                }]}
                className="flex-row items-center justify-between bg-surface rounded-xl p-4 border border-border"
              >
                <View>
                  <Text className="text-base font-semibold text-foreground">{meal.name}</Text>
                  <Text className="text-xs text-muted mt-1">{meal.time}</Text>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
