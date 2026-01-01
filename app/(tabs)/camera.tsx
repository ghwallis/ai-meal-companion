import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

/**
 * Camera Screen - AI Meal Companion
 *
 * Allows users to:
 * - Capture photos of meals for identification
 * - Record videos for real-time cooking coaching
 * - View identified meal details and get recipes
 */
export default function CameraScreen() {
  const colors = useColors();
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isCapturing, setIsCapturing] = useState(false);
  const [identifiedMeal, setIdentifiedMeal] = useState<{
    name: string;
    ingredients: string[];
    prepTime: number;
  } | null>(null);

  const handleCapture = () => {
    setIsCapturing(true);
    // Simulate meal identification
    setTimeout(() => {
      setIdentifiedMeal({
        name: "Chicken Tikka Masala",
        ingredients: ["Chicken", "Yogurt", "Tomato", "Cream", "Spices"],
        prepTime: 45,
      });
      setIsCapturing(false);
    }, 2000);
  };

  if (identifiedMeal) {
    return (
      <ScreenContainer className="bg-background">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="px-6 py-8 gap-6">
            {/* Identified Meal Card */}
            <View className="bg-surface rounded-2xl p-6 border border-border">
              <Text className="text-sm font-semibold text-primary mb-2">Identified Meal</Text>
              <Text className="text-3xl font-bold text-foreground mb-4">{identifiedMeal.name}</Text>

              {/* Ingredients */}
              <View className="gap-3 mb-6">
                <Text className="text-base font-semibold text-foreground">Key Ingredients</Text>
                <View className="flex-row flex-wrap gap-2">
                  {identifiedMeal.ingredients.map((ingredient, idx) => (
                    <View
                      key={idx}
                      className="bg-primary/10 px-3 py-2 rounded-full border border-primary/20"
                    >
                      <Text className="text-xs font-semibold text-primary">{ingredient}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Prep Time */}
              <View className="flex-row items-center gap-2 mb-6">
                <IconSymbol name="paperplane.fill" size={16} color={colors.muted} />
                <Text className="text-sm text-muted">
                  Prep time: {identifiedMeal.prepTime} minutes
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="gap-3">
                <Pressable
                  style={({ pressed }) => [{
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.9 : 1,
                  }]}
                  className="rounded-lg py-3 items-center justify-center"
                >
                  <Text className="text-base font-semibold text-background">Get Full Recipe</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [{
                    backgroundColor: colors.surface,
                    opacity: pressed ? 0.8 : 1,
                  }]}
                  className="rounded-lg py-3 items-center justify-center border border-border"
                >
                  <Text className="text-base font-semibold text-foreground">Save Meal</Text>
                </Pressable>

                <Pressable
                  onPress={() => setIdentifiedMeal(null)}
                  style={({ pressed }) => [{
                    opacity: pressed ? 0.7 : 1,
                  }]}
                  className="rounded-lg py-3 items-center justify-center"
                >
                  <Text className="text-base font-semibold text-primary">Capture Another</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Camera Preview Area */}
        <View className="flex-1 bg-foreground/10 items-center justify-center relative">
          <View className="w-64 h-64 border-2 border-primary rounded-2xl opacity-50" />
          <Text className="absolute text-center text-muted mt-4 px-6">
            Camera preview will appear here
          </Text>
        </View>

        {/* Controls */}
        <View className="px-6 py-8 gap-6 bg-background">
          {/* Mode Toggle */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setMode("photo")}
              style={({ pressed }) => [{
                flex: 1,
                backgroundColor: mode === "photo" ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className={`font-semibold ${mode === "photo" ? "text-background" : "text-foreground"}`}>
                📸 Photo
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode("video")}
              style={({ pressed }) => [{
                flex: 1,
                backgroundColor: mode === "video" ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className={`font-semibold ${mode === "video" ? "text-background" : "text-foreground"}`}>
                🎥 Video
              </Text>
            </Pressable>
          </View>

          {/* Capture Button */}
          <Pressable
            onPress={handleCapture}
            disabled={isCapturing}
            style={({ pressed }) => [{
              backgroundColor: colors.primary,
              opacity: isCapturing ? 0.6 : pressed ? 0.9 : 1,
            }]}
            className="rounded-full py-4 items-center justify-center"
          >
            <Text className="text-lg font-bold text-background">
              {isCapturing ? "Analyzing..." : mode === "photo" ? "📸 Capture" : "🎥 Record"}
            </Text>
          </Pressable>

          {/* Info Text */}
          <Text className="text-xs text-muted text-center">
            {mode === "photo"
              ? "Take a photo of your meal to identify it and get a recipe"
              : "Record 5-10 seconds of your cooking for real-time coaching"}
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
