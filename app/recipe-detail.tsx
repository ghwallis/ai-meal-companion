import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

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
  const [isSaved, setIsSaved] = useState(false);
  const [servings, setServings] = useState(4);

  const recipe = {
    id: "1",
    title: "Mediterranean Quinoa Bowl",
    image: "🥗",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Easy",
    calories: 380,
    protein: 12,
    carbs: 48,
    fat: 16,
    description: "A light, nutritious bowl packed with fresh vegetables, protein-rich quinoa, and a zesty lemon dressing.",
  };

  const ingredients: RecipeIngredient[] = [
    { id: "1", name: "Quinoa", amount: "1", unit: "cup" },
    { id: "2", name: "Cherry Tomatoes", amount: "1", unit: "cup" },
    { id: "3", name: "Cucumber", amount: "1", unit: "medium" },
    { id: "4", name: "Red Bell Pepper", amount: "1", unit: "medium" },
    { id: "5", name: "Feta Cheese", amount: "0.5", unit: "cup" },
    { id: "6", name: "Olive Oil", amount: "3", unit: "tbsp" },
    { id: "7", name: "Lemon Juice", amount: "2", unit: "tbsp" },
    { id: "8", name: "Garlic", amount: "2", unit: "cloves" },
  ];

  const steps: RecipeStep[] = [
    {
      id: "1",
      step: 1,
      instruction: "Cook quinoa according to package directions. Set aside to cool.",
      time: 20,
    },
    {
      id: "2",
      step: 2,
      instruction: "Dice tomatoes, cucumber, and bell pepper into bite-sized pieces.",
      time: 5,
    },
    {
      id: "3",
      step: 3,
      instruction: "In a small bowl, whisk together olive oil, lemon juice, and minced garlic.",
      time: 2,
    },
    {
      id: "4",
      step: 4,
      instruction: "Combine cooked quinoa with vegetables in a large bowl.",
      time: 3,
    },
    {
      id: "5",
      step: 5,
      instruction: "Pour dressing over the bowl and toss well. Top with feta cheese.",
      time: 2,
    },
    {
      id: "6",
      step: 6,
      instruction: "Serve immediately or refrigerate for up to 2 days.",
      time: 0,
    },
  ];

  const tips = [
    "Prepare ingredients ahead of time for quick assembly",
    "Use fresh lemon juice for best flavor",
    "Add grilled chicken or chickpeas for extra protein",
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Recipe Header */}
          <View className="gap-4">
            <View className="text-6xl items-center mb-4">
              <Text className="text-6xl">{recipe.image}</Text>
            </View>

            <View className="gap-2">
              <Text className="text-3xl font-bold text-foreground">{recipe.title}</Text>
              <Text className="text-sm text-muted">{recipe.description}</Text>
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-3">
              <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                <Text className="text-xs text-muted">Prep</Text>
                <Text className="text-base font-bold text-foreground mt-1">{recipe.prepTime}m</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                <Text className="text-xs text-muted">Cook</Text>
                <Text className="text-base font-bold text-foreground mt-1">{recipe.cookTime}m</Text>
              </View>
              <View className="flex-1 bg-surface rounded-lg p-3 border border-border items-center">
                <Text className="text-xs text-muted">Level</Text>
                <Text className="text-base font-bold text-foreground mt-1">{recipe.difficulty}</Text>
              </View>
            </View>
          </View>

          {/* Nutrition */}
          <View className="bg-surface rounded-lg p-4 border border-border">
            <Text className="text-base font-bold text-foreground mb-3">Per Serving</Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Calories</Text>
                <Text className="text-lg font-bold text-primary mt-1">{recipe.calories}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Protein</Text>
                <Text className="text-lg font-bold text-primary mt-1">{recipe.protein}g</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Carbs</Text>
                <Text className="text-lg font-bold text-primary mt-1">{recipe.carbs}g</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Fat</Text>
                <Text className="text-lg font-bold text-primary mt-1">{recipe.fat}g</Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Ingredients</Text>
            {ingredients.map((ingredient) => (
              <View
                key={ingredient.id}
                className="flex-row items-center justify-between bg-surface rounded-lg p-3 border border-border"
              >
                <Text className="text-base text-foreground">{ingredient.name}</Text>
                <Text className="text-sm text-muted">
                  {ingredient.amount} {ingredient.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Instructions */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Instructions</Text>
            {steps.map((step) => (
              <View
                key={step.id}
                className="flex-row gap-3 bg-surface rounded-lg p-4 border border-border"
              >
                <View
                  style={{ backgroundColor: colors.primary }}
                  className="w-8 h-8 rounded-full items-center justify-center"
                >
                  <Text className="text-sm font-bold text-background">{step.step}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-base text-foreground leading-relaxed">
                    {step.instruction}
                  </Text>
                  {step.time > 0 && (
                    <Text className="text-xs text-muted mt-2">⏱️ {step.time} minutes</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Chef Tips */}
          <View className="gap-3">
            <Text className="text-lg font-bold text-foreground">Chef's Tips</Text>
            {tips.map((tip, idx) => (
              <View
                key={idx}
                className="flex-row gap-3 bg-primary/10 rounded-lg p-4 border border-primary/20"
              >
                <Text className="text-lg">💡</Text>
                <Text className="text-sm text-foreground flex-1 leading-relaxed">{tip}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <Pressable
              onPress={() => setIsSaved(!isSaved)}
              style={({ pressed }) => [{
                backgroundColor: isSaved ? colors.primary : colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className={`text-base font-semibold ${isSaved ? "text-background" : "text-foreground"}`}>
                {isSaved ? "❤️ Saved" : "🤍 Save Recipe"}
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className="text-base font-semibold text-foreground">📤 Share</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
