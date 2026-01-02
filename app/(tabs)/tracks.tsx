import { View, Text, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface Track {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  examples: string[];
}

/**
 * Tracks Selection Screen - AI Meal Companion
 *
 * Allows users to choose and customize their meal journey:
 * - Weight Loss
 * - Muscle Gain
 * - Culinary Explorer
 * - Budget Cooking
 * - Just Eating (Casual)
 */
export default function TracksScreen() {
  const colors = useColors();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const tracks: Track[] = [
    {
      id: "weight-loss",
      name: "Weight Loss",
      emoji: "⚖️",
      description: "Achieve your fitness goals with calorie-tracked meals and expert guidance",
      color: "#FF6B6B",
      examples: ["Grilled Chicken Salad", "Vegetable Stir Fry", "Quinoa Bowl"],
    },
    {
      id: "muscle-gain",
      name: "Muscle Gain",
      emoji: "💪",
      description: "High-protein meals designed to support muscle growth and recovery",
      color: "#4ECDC4",
      examples: ["Salmon with Rice", "Chicken & Broccoli", "Protein Pasta"],
    },
    {
      id: "culinary-explorer",
      name: "Culinary Explorer",
      emoji: "🌍",
      description: "Discover diverse cuisines and master advanced cooking techniques",
      color: "#FFD93D",
      examples: ["Thai Curry", "French Coq au Vin", "Japanese Ramen"],
    },
    {
      id: "budget-cooking",
      name: "Budget Cooking",
      emoji: "💰",
      description: "Delicious, affordable meals using budget-friendly ingredients",
      color: "#6BCB77",
      examples: ["Bean Chili", "Pasta Marinara", "Vegetable Soup"],
    },
    {
      id: "just-eating",
      name: "Just Eating",
      emoji: "😋",
      description: "No tracking, no stress—just enjoy great food and discover new flavors",
      color: "#A8E6CF",
      examples: ["Whatever You Want", "Comfort Food", "Casual Dining"],
    },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Choose Your Journey</Text>
            <Text className="text-base text-muted">
              Select a track to personalize your meal recommendations
            </Text>
          </View>

          {/* Track Cards */}
          <View className="gap-4">
            {tracks.map((track) => (
              <Pressable
                key={track.id}
                onPress={() => setSelectedTrack(track.id)}
                style={({ pressed }) => [{
                  opacity: pressed ? 0.8 : 1,
                  borderColor: selectedTrack === track.id ? track.color : "transparent",
                  borderWidth: selectedTrack === track.id ? 2 : 1,
                }]}
                className="bg-surface rounded-2xl p-6 border border-border"
              >
                {/* Track Header */}
                <View className="flex-row items-center gap-3 mb-3">
                  <Text className="text-4xl">{track.emoji}</Text>
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-foreground">{track.name}</Text>
                  </View>
                  {selectedTrack === track.id && (
                    <View
                      style={{ backgroundColor: track.color }}
                      className="w-6 h-6 rounded-full items-center justify-center"
                    >
                      <Text className="text-sm font-bold text-background">✓</Text>
                    </View>
                  )}
                </View>

                {/* Description */}
                <Text className="text-sm text-muted leading-relaxed mb-4">
                  {track.description}
                </Text>

                {/* Example Meals */}
                <View className="flex-row flex-wrap gap-2">
                  {track.examples.map((example, idx) => (
                    <View
                      key={idx}
                      style={{ backgroundColor: `${track.color}20` }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: track.color }}
                        className="text-xs font-semibold"
                      >
                        {example}
                      </Text>
                    </View>
                  ))}
                </View>
              </Pressable>
            ))}
          </View>

          {/* Confirm Button */}
          <Pressable
            disabled={!selectedTrack}
            style={({ pressed }) => [{
              backgroundColor: selectedTrack ? colors.primary : colors.muted,
              opacity: pressed && selectedTrack ? 0.9 : 1,
            }]}
            className="rounded-lg py-4 items-center justify-center mt-4"
          >
            <Text className="text-lg font-bold text-background">
              {selectedTrack ? "Confirm Track" : "Select a Track"}
            </Text>
          </Pressable>

          {/* Info Text */}
          <Text className="text-xs text-muted text-center">
            You can change your track anytime from the Profile screen
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
