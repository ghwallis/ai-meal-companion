import { View, Text, Pressable, ScrollView, Animated, Alert, ActivityIndicator } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { FadeInScreen, ModalScreen } from "@/lib/screen-transitions";
import { trpc } from "@/lib/trpc";

/**
 * Camera Screen - AI Meal Companion
 *
 * Allows users to:
 * - Capture photos of meals for AI identification
 * - Record videos for real-time cooking coaching
 * - View identified meal details and get recipes
 */
export default function CameraScreen() {
  const router = useRouter();
  const colors = useColors();
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraReady, setCameraReady] = useState(true);
  const [identifiedMeal, setIdentifiedMeal] = useState<{
    dishName: string;
    ingredients: Array<{
      name: string;
      quantity: string;
      unit: string;
    }>;
    calories: number;
    macros: {
      protein: number;
      fat: number;
      carbs: number;
    };
    cuisineType?: string;
    difficulty?: "easy" | "medium" | "hard";
    confidence: number;
  } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const identifyMealMutation = trpc.ai.identifyMeal.useMutation();
  const generateRecipeMutation = trpc.ai.generateRecipe.useMutation();
  const logMealMutation = trpc.meals.logMeal.useMutation();

  useEffect(() => {
    if (isCapturing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isCapturing]);

  const handleCapture = async () => {
    try {
      // Request camera permissions
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      
      if (cameraPermission.status !== "granted") {
        Alert.alert(
          "Camera Permission Required",
          "Please enable camera access in Settings to identify meals.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]) {
        return;
      }

      setIsCapturing(true);

      // TODO: Upload image to cloud storage (Supabase/Cloudinary) and get URL
      // For now, use the local URI (this won't work with OpenAI API)
      // In production: upload to cloud, then pass cloud URL to API
      const imageUrl = result.assets[0].uri;

      const mealData = await identifyMealMutation.mutateAsync({
        imageUrl,
      });

      setIdentifiedMeal(mealData as typeof identifiedMeal);
    } catch (error) {
      console.error("Meal identification failed:", error);
      Alert.alert(
        "Identification Failed",
        "Could not identify the meal. Please try again with a clearer photo.",
        [{ text: "OK" }]
      );
    } finally {
      setIsCapturing(false);
    }
  };

  const handlePickImage = async () => {
    try {
      // Request photo library permissions
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (libraryPermission.status !== "granted") {
        Alert.alert(
          "Photo Library Permission Required",
          "Please enable photo library access in Settings.",
          [{ text: "OK" }]
        );
        return;
      }

      // Launch photo library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (result.canceled || !result.assets[0]) {
        return;
      }

      setIsCapturing(true);

      // TODO: Upload to cloud storage
      const imageUrl = result.assets[0].uri;

      const mealData = await identifyMealMutation.mutateAsync({
        imageUrl,
      });

      setIdentifiedMeal(mealData as typeof identifiedMeal);
    } catch (error) {
      console.error("Meal identification failed:", error);
      Alert.alert(
        "Identification Failed",
        "Could not identify the meal. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsCapturing(false);
    }
  };

  const handleSaveMeal = async () => {
    if (!identifiedMeal || isSaved) return;

    try {
      await logMealMutation.mutateAsync({
        dishName: identifiedMeal.dishName,
        ingredients: identifiedMeal.ingredients,
        nutrition: identifiedMeal.macros
          ? {
              calories: identifiedMeal.calories,
              protein: identifiedMeal.macros.protein,
              carbs: identifiedMeal.macros.carbs,
              fat: identifiedMeal.macros.fat,
            }
          : {
              calories: identifiedMeal.calories,
              protein: 0,
              carbs: 0,
              fat: 0,
            },
        cuisineType: identifiedMeal.cuisineType,
        source: "camera",
        confidence: Math.round(identifiedMeal.confidence * 100),
      });

      setIsSaved(true);
      Alert.alert("Success", "Meal saved to your history!", [{ text: "OK" }]);
    } catch (error) {
      console.error("Failed to save meal:", error);
      Alert.alert(
        "Save Failed",
        "Could not save meal to history. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  const handleGetRecipe = async () => {
    if (!identifiedMeal) return;

    try {
      Alert.alert(
        "Generate Recipe",
        "Would you like to generate a full recipe for this meal?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              const recipe = await generateRecipeMutation.mutateAsync({
                ingredients: identifiedMeal.ingredients.map((ing) => ing.name),
                preferences: {
                  cuisineType: identifiedMeal.cuisineType,
                  servings: 2,
                },
              });

              // Navigate to recipe detail with generated recipe
              router.push({
                pathname: "/recipe-detail",
                params: { recipeData: JSON.stringify(recipe) },
              });
            },
          },
        ]
      );
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      Alert.alert(
        "Generation Failed",
        "Could not generate recipe. Please try again.",
        [{ text: "OK" }]
      );
    }
  };

  if (identifiedMeal) {
    return (
      <ScreenContainer className="bg-background">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="px-6 py-8 gap-6">
            {/* Identified Meal Card */}
            <View
              style={{ borderColor: colors.primary }}
              className="bg-surface rounded-2xl p-6 border-2"
            >
              <View className="flex-row items-center gap-2 mb-2">
                <Text style={{ color: colors.primary }} className="text-sm font-bold">
                  Identified Meal
                </Text>
                <Text style={{ color: colors.primary }} className="text-xs font-bold">
                  {Math.round(identifiedMeal.confidence * 100)}% confident
                </Text>
              </View>
              <Text className="text-3xl font-bold text-foreground mb-4">
                {identifiedMeal.dishName}
              </Text>

              {/* Cuisine & Difficulty */}
              {(identifiedMeal.cuisineType || identifiedMeal.difficulty) && (
                <View className="flex-row gap-2 mb-6">
                  {identifiedMeal.cuisineType && (
                    <View
                      style={{ backgroundColor: `${colors.primary}15` }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: colors.primary }}
                        className="text-xs font-semibold"
                      >
                        {identifiedMeal.cuisineType}
                      </Text>
                    </View>
                  )}
                  {identifiedMeal.difficulty && (
                    <View
                      style={{ backgroundColor: `${colors.primary}15` }}
                      className="px-3 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: colors.primary }}
                        className="text-xs font-semibold"
                      >
                        {identifiedMeal.difficulty === "easy"
                          ? "🟢 Easy"
                          : identifiedMeal.difficulty === "medium"
                            ? "🟡 Medium"
                            : "🔴 Hard"}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* Nutrition */}
              <View className="gap-3 mb-6">
                <Text className="text-base font-semibold text-foreground">
                  Nutrition Info
                </Text>
                <View className="flex-row gap-2">
                  {[
                    {
                      label: "Calories",
                      value: identifiedMeal.calories,
                      emoji: "🔥",
                    },
                    {
                      label: "Protein",
                      value: identifiedMeal.macros.protein,
                      emoji: "💪",
                      unit: "g",
                    },
                    {
                      label: "Carbs",
                      value: identifiedMeal.macros.carbs,
                      emoji: "🌾",
                      unit: "g",
                    },
                    {
                      label: "Fat",
                      value: identifiedMeal.macros.fat,
                      emoji: "🧈",
                      unit: "g",
                    },
                  ].map((item) => (
                    <View
                      key={item.label}
                      style={{
                        backgroundColor: colors.border,
                        flex: 1,
                      }}
                      className="rounded-xl p-3"
                    >
                      <Text style={{ fontSize: 16 }}>{item.emoji}</Text>
                      <Text className="text-xs text-muted mt-1">{item.label}</Text>
                      <Text style={{ color: colors.foreground }} className="font-bold mt-1">
                        {Math.round(item.value)}
                        {item.unit || ""}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Ingredients */}
              <View className="gap-3 mb-6">
                <Text className="text-base font-semibold text-foreground">
                  Key Ingredients
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {identifiedMeal.ingredients.map((ingredient, idx) => (
                    <View
                      key={idx}
                      style={{ backgroundColor: `${colors.primary}15` }}
                      className="px-3 py-2 rounded-full"
                    >
                      <Text
                        style={{ color: colors.primary }}
                        className="text-xs font-semibold"
                      >
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Action Buttons */}
              <View className="gap-3">
                <Pressable
                  onPress={handleGetRecipe}
                  disabled={generateRecipeMutation.isPending}
                  style={({ pressed }) => ({
                    backgroundColor: colors.primary,
                    opacity: pressed ? 0.9 : 1,
                  })}
                  className="rounded-xl py-3 items-center justify-center"
                >
                  {generateRecipeMutation.isPending ? (
                    <View className="flex-row items-center gap-2">
                      <ActivityIndicator color={colors.background} size="small" />
                      <Text className="text-base font-bold text-background">
                        Generating...
                      </Text>
                    </View>
                  ) : (
                    <Text className="text-base font-bold text-background">
                      Get Full Recipe
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={handleSaveMeal}
                  disabled={isSaved || logMealMutation.isPending}
                  style={({ pressed }) => ({
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    opacity: pressed ? 0.8 : 1,
                  })}
                  className="rounded-xl py-3 items-center justify-center border"
                >
                  {logMealMutation.isPending ? (
                    <View className="flex-row items-center gap-2">
                      <ActivityIndicator color={colors.foreground} size="small" />
                      <Text className="text-base font-bold text-foreground">Saving...</Text>
                    </View>
                  ) : (
                    <Text className="text-base font-bold text-foreground">
                      {isSaved ? "Saved ✅" : "Save Meal"}
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  onPress={() => {
                    setIsSaved(false);
                    setIdentifiedMeal(null);
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.7 : 1,
                  })}
                  className="rounded-xl py-3 items-center justify-center"
                >
                  <Text style={{ color: colors.primary }} className="text-base font-bold">
                    Capture Another
                  </Text>
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
        <View className="flex-1 items-center justify-center relative border-b border-border px-6 py-8">
          <View
            style={{
              backgroundColor: colors.foreground + "08",
              borderColor: colors.primary,
              borderWidth: 3,
              aspectRatio: 4 / 3,
              width: "100%",
              maxWidth: 400,
              shadowColor: colors.primary,
              shadowOpacity: 0.2,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 4,
            }}
            className="rounded-3xl items-center justify-center overflow-hidden"
          >
            <View className="items-center gap-3">
              <Text className="text-7xl">📸</Text>
              <Text style={{ color: colors.foreground }} className="text-lg font-bold">
                Camera preview
              </Text>
              <Text className="text-muted text-sm text-center px-8 leading-relaxed">
                Position your meal in the center of the frame for best results
              </Text>
            </View>
          </View>
        </View>

        {/* Controls */}
        <View className="px-6 py-8 gap-6 bg-background">
          {/* Mode Toggle */}
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => setMode("photo")}
              style={
                ({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    mode === "photo" ? colors.primary : colors.surface,
                  borderColor:
                    mode === "photo" ? colors.primary : colors.border,
                  borderWidth: 2,
                  opacity: pressed ? 0.8 : 1,
                  shadowColor:
                    mode === "photo" ? colors.primary : "transparent",
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: mode === "photo" ? 4 : 0,
                })
              }
              className="rounded-2xl py-4 items-center justify-center"
            >
              <Text className="text-3xl mb-1">📸</Text>
              <Text
                style={{
                  color:
                    mode === "photo"
                      ? colors.background
                      : colors.foreground,
                }}
                className="font-bold text-base"
              >
                Photo
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode("video")}
              style={
                ({ pressed }) => ({
                  flex: 1,
                  backgroundColor:
                    mode === "video" ? colors.primary : colors.surface,
                  borderColor:
                    mode === "video" ? colors.primary : colors.border,
                  borderWidth: 2,
                  opacity: pressed ? 0.8 : 1,
                  shadowColor:
                    mode === "video" ? colors.primary : "transparent",
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: mode === "video" ? 4 : 0,
                })
              }
              className="rounded-2xl py-4 items-center justify-center"
            >
              <Text className="text-3xl mb-1">🎥</Text>
              <Text
                style={{
                  color:
                    mode === "video"
                      ? colors.background
                      : colors.foreground,
                }}
                className="font-bold text-base"
              >
                Video
              </Text>
            </Pressable>
          </View>

          {/* Capture Button */}
          <Pressable
            onPress={handleCapture}
            disabled={isCapturing}
            style={
              ({ pressed }) => ({
                backgroundColor: colors.primary,
                opacity: isCapturing ? 0.7 : pressed ? 0.9 : 1,
                shadowColor: colors.primary,
                shadowOpacity: 0.4,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 6,
              })
            }
            className="rounded-2xl py-5 items-center justify-center"
          >
            {isCapturing ? (
              <View className="flex-row items-center gap-3">
                <ActivityIndicator color={colors.background} />
                <Text style={{ color: colors.background }} className="text-xl font-bold">
                  Analyzing...
                </Text>
              </View>
            ) : (
              <Text style={{ color: colors.background }} className="text-xl font-bold">
                {mode === "photo" ? "📸 Capture Photo" : "🎥 Start Recording"}
              </Text>
            )}
          </Pressable>

          {/* Pick from Library Button */}
          {mode === "photo" && (
            <Pressable
              onPress={handlePickImage}
              disabled={isCapturing}
              style={
                ({ pressed }) => ({
                  backgroundColor: colors.surface,
                  borderColor: colors.primary,
                  borderWidth: 2,
                  opacity: isCapturing ? 0.5 : pressed ? 0.7 : 1,
                })
              }
              className="rounded-2xl py-4 items-center justify-center"
            >
              <Text style={{ color: colors.primary }} className="text-base font-bold">
                📁 Choose from Library
              </Text>
            </Pressable>
          )}

          {/* Info Card */}
          <View
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderWidth: 1,
            }}
            className="rounded-2xl p-4"
          >
            <Text
              style={{ color: colors.foreground }}
              className="text-base font-semibold mb-2 text-center"
            >
              How it works
            </Text>
            <Text className="text-sm text-muted text-center leading-relaxed">
              {mode === "photo"
                ? "Snap a photo of any meal to instantly identify ingredients, nutritional info, and get detailed recipes"
                : "Record 5-10 seconds of your cooking for real-time guidance and step-by-step coaching"}
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}
