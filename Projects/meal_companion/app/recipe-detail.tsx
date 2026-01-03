import { View, Text, ScrollView, Pressable, Alert, Share, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { BackHeader } from "@/components/ui/back-header";
import { Skeleton, SkeletonText, SkeletonStats } from "@/components/ui/skeleton";
import { HapticTriggers } from "@/lib/haptic";
import { FadeInScreen } from "@/lib/screen-transitions";
import { trpc } from "@/lib/trpc";

interface RecipeStep {
  id: string;
  step: number;
  instruction: string;
  time: number;
}

interface RecipeIngredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

/**
 * Recipe Detail Screen - AI Meal Companion
 *
 * Displays:
 * - Full recipe information
 * - Ingredients list
 * - Step-by-step instructions
 * - Nutritional information
 * - Cooking tips
 * - Save/Share options
 */
export default function RecipeDetailScreen() {
  const colors = useColors();
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [isSaved, setIsSaved] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);

  const createRecipeMutation = trpc.recipes.create.useMutation();

  useEffect(() => {
    // Load recipe from navigation params
    if (params.recipeData) {
      try {
        const parsedRecipe = JSON.parse(params.recipeData as string);
        setRecipe(parsedRecipe);
      } catch (error) {
        console.error("Failed to parse recipe data:", error);
        Alert.alert("Error", "Could not load recipe data");
      }
    } else {
      // Use placeholder data if no params (for testing)
      setRecipe({
        name: "Mediterranean Quinoa Bowl",
        image: "🥗",
        prepTime: 15,
        cookTime: 20,
        servings: 4,
        difficulty: "easy",
        calories: 380,
        nutrition: {
          protein: 12,
          carbs: 48,
          fat: 16,
          calories: 380,
        },
        description: "A light, nutritious bowl packed with fresh vegetables, protein-rich quinoa, and a zesty lemon dressing.",
        ingredients: [
          { name: "Quinoa", quantity: "1", unit: "cup" },
          { name: "Cherry Tomatoes", quantity: "1", unit: "cup" },
          { name: "Cucumber", quantity: "1", unit: "medium" },
          { name: "Red Bell Pepper", quantity: "1", unit: "medium" },
          { name: "Feta Cheese", quantity: "0.5", unit: "cup" },
          { name: "Olive Oil", quantity: "3", unit: "tbsp" },
          { name: "Lemon Juice", quantity: "2", unit: "tbsp" },
          { name: "Garlic", quantity: "2", unit: "cloves" },
        ],
        instructions: [
          { step: 1, description: "Cook quinoa according to package directions. Set aside to cool.", duration: 20 },
          { step: 2, description: "Dice tomatoes, cucumber, and bell pepper into bite-sized pieces.", duration: 5 },
          { step: 3, description: "In a small bowl, whisk together olive oil, lemon juice, and minced garlic.", duration: 2 },
          { step: 4, description: "Combine cooked quinoa with vegetables in a large bowl.", duration: 3 },
          { step: 5, description: "Pour dressing over the bowl and toss well. Top with feta cheese.", duration: 2 },
          { step: 6, description: "Serve immediately or refrigerate for up to 2 days.", duration: 0 },
        ],
      });
    }
  }, [params.recipeData]);

  const handleSaveRecipe = async () => {
    if (!recipe || isSaved) return;

    try {
      await createRecipeMutation.mutateAsync({
        name: recipe.name,
        source: recipe.source || "ai_generated",
        ingredients: recipe.ingredients.map((ing: any) => ({
          name: ing.name || ing,
          quantity: ing.quantity || ing.amount || "As needed",
          unit: ing.unit || "",
        })),
        instructions: recipe.instructions.map((inst: any, index: number) => ({
          step: inst.step || index + 1,
          description: typeof inst === "string" ? inst : inst.description || inst.instruction || inst,
          duration: inst.duration || inst.time || 0,
        })),
        nutrition: {
          calories: recipe.nutrition?.calories || recipe.calories || 0,
          protein: recipe.nutrition?.protein || recipe.protein || 0,
          carbs: recipe.nutrition?.carbs || recipe.carbs || 0,
          fat: recipe.nutrition?.fat || recipe.fat || 0,
          servings: recipe.servings || 2,
        },
        difficulty: recipe.difficulty || "medium",
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings || 2,
        cuisineType: recipe.cuisineType,
      });

      setIsSaved(true);
      Alert.alert("Success", "Recipe saved to your collection!", [{ text: "OK" }]);
    } catch (error) {
      console.error("Failed to save recipe:", error);
      Alert.alert("Save Failed", "Could not save recipe. Please try again.", [{ text: "OK" }]);
    }
  };

  const isLoading = !recipe;

  if (isLoading) {
    return (
      <FadeInScreen>
        <ScreenContainer className="bg-background">
          <BackHeader title="Recipe Details" />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
            <View className="px-6 py-8 gap-6">
              {/* Image Skeleton */}
              <Skeleton width={80} height={80} borderRadius={8} style={{ marginHorizontal: "auto" }} />
              
              {/* Title and Description Skeleton */}
              <View className="gap-2">
                <Skeleton width="80%" height={28} borderRadius={6} />
                <Skeleton width="100%" height={14} borderRadius={4} />
                <Skeleton width="90%" height={14} borderRadius={4} />
            </View>

            {/* Quick Stats Skeleton */}
            <View className="flex-row gap-3">
              <Skeleton width="30%" height={70} borderRadius={8} />
              <Skeleton width="30%" height={70} borderRadius={8} />
              <Skeleton width="30%" height={70} borderRadius={8} />
            </View>

            {/* Nutrition Skeleton */}
            <View className="gap-3">
              <Skeleton width="30%" height={18} borderRadius={4} />
              <View className="flex-row gap-3">
                <Skeleton width="22%" height={60} borderRadius={6} />
                <Skeleton width="22%" height={60} borderRadius={6} />
                <Skeleton width="22%" height={60} borderRadius={6} />
                <Skeleton width="22%" height={60} borderRadius={6} />
              </View>
            </View>

            {/* Ingredients Skeleton */}
            <View className="gap-3">
              <Skeleton width="30%" height={18} borderRadius={4} />
              <Skeleton width="100%" height={50} borderRadius={6} />
              <Skeleton width="100%" height={50} borderRadius={6} />
              <Skeleton width="100%" height={50} borderRadius={6} />
            </View>

            {/* Instructions Skeleton */}
            <View className="gap-3">
              <Skeleton width="30%" height={18} borderRadius={4} />
              <Skeleton width="100%" height={80} borderRadius={6} />
              <Skeleton width="100%" height={80} borderRadius={6} />
            </View>
          </View>
        </ScrollView>
      </ScreenContainer>
      </FadeInScreen>
    );
  }

  const nutrition = recipe.nutrition || {
    calories: recipe.calories || 0,
    protein: recipe.protein || 0,
    carbs: recipe.carbs || 0,
    fat: recipe.fat || 0,
  };

  return (
    <FadeInScreen>
    <ScreenContainer className="bg-background">
      <BackHeader
        title="Recipe Details"
        rightSlot={(
          <Pressable
            onPress={() => {
              HapticTriggers.favorite();
              handleSaveRecipe();
            }}
            disabled={isSaved || createRecipeMutation.isPending}
            style={({ pressed }) => [{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: isSaved ? colors.primary : colors.surface,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: isSaved ? colors.primary : colors.border,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.95 : 1 }],
            }]}
          >
            {createRecipeMutation.isPending ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <Text className="text-xl">{isSaved ? "❤️" : "🤍"}</Text>
            )}
          </Pressable>
        )}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Recipe Header */}
          <View className="gap-4">
            <View className="text-6xl items-center mb-4">
              <Text className="text-6xl">{recipe.image || "🍽️"}</Text>
            </View>

            <View className="gap-2">
              <Text className="text-3xl font-bold text-foreground">{recipe.name || recipe.title}</Text>
              {recipe.description && (
                <Text className="text-sm text-muted">{recipe.description}</Text>
              )}
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-3">
              {recipe.prepTime && (
                <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                  <Text className="text-xs text-muted">Prep</Text>
                  <Text className="text-base font-bold text-foreground mt-1">{recipe.prepTime}m</Text>
                </View>
              )}
              {recipe.cookTime && (
                <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                  <Text className="text-xs text-muted">Cook</Text>
                  <Text className="text-base font-bold text-foreground mt-1">{recipe.cookTime}m</Text>
                </View>
              )}
              {recipe.difficulty && (
                <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                  <Text className="text-xs text-muted">Level</Text>
                  <Text className="text-base font-bold text-foreground mt-1 capitalize">{recipe.difficulty}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Nutrition */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-base font-bold text-foreground mb-3">Per Serving</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Calories</Text>
                <Text className="text-lg font-bold text-primary mt-1">{nutrition.calories}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Protein</Text>
                <Text className="text-lg font-bold text-primary mt-1">{nutrition.protein}g</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Carbs</Text>
                <Text className="text-lg font-bold text-primary mt-1">{nutrition.carbs}g</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Fat</Text>
                <Text className="text-lg font-bold text-primary mt-1">{nutrition.fat}g</Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Ingredients</Text>
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <View
                key={index}
                className="flex-row items-center justify-between bg-surface rounded-lg p-3 border border-border"
              >
                <Text className="text-base text-foreground">{ingredient.name}</Text>
                <Text className="text-sm text-muted">
                  {ingredient.quantity || ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Instructions</Text>
            {recipe.instructions.map((step: any, index: number) => {
              const instruction = typeof step === "string" ? step : step.description || step.instruction;
              const duration = step.duration || step.time || 0;
              
              return (
                <View
                  key={index}
                  className="flex-row gap-3 bg-surface rounded-lg p-4 border border-border"
                >
                  <View
                    style={{ backgroundColor: colors.primary }}
                    className="w-8 h-8 rounded-full items-center justify-center"
                  >
                    <Text className="text-sm font-bold text-background">{step.step || index + 1}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="text-base text-foreground leading-relaxed">
                      {instruction}
                    </Text>
                    {duration > 0 && (
                      <Text className="text-xs text-muted mt-2">⏱️ {duration} minutes</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Chef Tips (if available) */}
          {recipe.tips && recipe.tips.length > 0 && (
            <View className="gap-3">
              <Text className="text-lg font-bold text-foreground">Chef's Tips</Text>
              {recipe.tips.map((tip: string, idx: number) => (
                <View
                  key={idx}
                  className="flex-row gap-3 bg-primary/10 rounded-lg p-4 border border-primary/20"
                >
                  <Text className="text-lg">💡</Text>
                  <Text className="text-sm text-foreground flex-1 leading-relaxed">{tip}</Text>
                </View>
              ))}
            </View>
          )}
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4 pb-8">
            <Pressable
              onPress={() => {
                HapticTriggers.save();
                handleSaveRecipe();
              }}
              disabled={isSaved || createRecipeMutation.isPending}
              style={({ pressed }) => [{
                backgroundColor: isSaved ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              {createRecipeMutation.isPending ? (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color={isSaved ? colors.background : colors.foreground} />
                  <Text className="text-base font-semibold text-foreground">Saving...</Text>
                </View>
              ) : (
                <Text className={`text-base font-semibold ${isSaved ? "text-background" : "text-foreground"}`}>
                  {isSaved ? "❤️ Saved to Collection" : "🤍 Save Recipe"}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={() => {
                HapticTriggers.buttonPress();
                router.push("/camera");
              }}
              style={({ pressed }) => [{
                backgroundColor: colors.primary,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              }]}
              className="rounded-xl py-3 items-center justify-center"
            >
              <Text className="text-base font-bold text-background">🎥 Start Cooking with Video Coaching</Text>
            </Pressable>

            <Pressable
              onPress={async () => {
                try {
                  HapticTriggers.share();
                  await Share.share({
                    title: recipe.name || recipe.title,
                    message: `Check out this recipe: ${recipe.name || recipe.title}\n\nPrep: ${recipe.prepTime || 0}m | Cook: ${recipe.cookTime || 0}m\n\nCalories: ${nutrition.calories} | Protein: ${nutrition.protein}g\n\n${recipe.description || ''}`,
                  });
                } catch (err) {
                  Alert.alert("Share failed", "Please try again.");
                }
              }}
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              }]}
              className="rounded-xl py-3 items-center justify-center border"
            >
              <Text className="text-base font-bold text-foreground">📤 Share</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </FadeInScreen>
  );
}

