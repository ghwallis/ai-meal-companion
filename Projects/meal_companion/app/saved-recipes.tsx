import { View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { BackHeader } from "@/components/ui/back-header";
import { useColors } from "@/hooks/use-colors";
import { SkeletonCard, SkeletonListItem } from "@/components/ui/skeleton";
import { SavedRecipesEmptyState } from "@/components/ui/empty-state";
import { HapticTriggers } from "@/lib/haptic";
import { trpc } from "@/lib/trpc";

/**
 * Saved Recipes Screen
 * 
 * Displays user's saved recipes with ability to:
 * - View full recipe details
 * - Toggle favorite status
 * - Filter by favorites
 * - Search saved recipes
 */
export default function SavedRecipesScreen() {
  const colors = useColors();
  const router = useRouter();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { data: savedRecipes, isLoading, refetch, isRefetching } = trpc.recipes.getSaved.useQuery();

  const filteredRecipes = savedRecipes?.filter(item => 
    !showFavoritesOnly || item.savedRecipe.isFavorite
  ) || [];

  const handleRecipePress = (recipe: any) => {
    router.push({
      pathname: "/recipe-detail",
      params: { recipeData: JSON.stringify(recipe) },
    });
  };

  if (isLoading) {
    return (
      <ScreenContainer className="bg-background">
        <BackHeader title="Saved Recipes" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="px-6 py-6 gap-4">
            {/* Filter Skeleton */}
            <View className="flex-row gap-3">
              <View className="flex-1 h-12 bg-border rounded-2xl" />
              <View className="flex-1 h-12 bg-border rounded-2xl" />
            </View>

            {/* Recipe Cards Skeleton */}
            <SkeletonCard showImage={false} style={{ marginTop: 8 }} />
            <SkeletonCard showImage={false} />
            <SkeletonCard showImage={false} />
          </View>
        </ScrollView>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <BackHeader 
        title="Saved Recipes"
        subtitle={`${savedRecipes?.length || 0} recipes saved`}
      />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }} 
        className="flex-1"
        refreshControl={
          <RefreshControl 
            refreshing={isRefetching} 
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
      >
        <View className="px-6 py-6 gap-6">
          {/* Filter Toggle */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => {
                HapticTriggers.itemSelect();
                setShowFavoritesOnly(false);
              }}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: !showFavoritesOnly ? colors.primary : colors.surface,
                borderColor: !showFavoritesOnly ? colors.primary : colors.border,
                borderWidth: 2,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className="rounded-2xl py-3 items-center"
            >
              <Text 
                style={{ 
                  color: !showFavoritesOnly ? colors.background : colors.foreground 
                }}
                className="font-bold"
              >
                All ({savedRecipes?.length || 0})
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                HapticTriggers.itemSelect();
                setShowFavoritesOnly(true);
              }}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: showFavoritesOnly ? colors.primary : colors.surface,
                borderColor: showFavoritesOnly ? colors.primary : colors.border,
                borderWidth: 2,
                opacity: pressed ? 0.8 : 1,
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              className="rounded-2xl py-3 items-center"
            >
              <Text 
                style={{ 
                  color: showFavoritesOnly ? colors.background : colors.foreground 
                }}
                className="font-bold"
              >
                ❤️ Favorites ({savedRecipes?.filter(r => r.savedRecipe.isFavorite).length || 0})
              </Text>
            </Pressable>
          </View>

          {/* Recipes List */}
          {filteredRecipes.length === 0 ? (
            <SavedRecipesEmptyState
              showFavoritesOnly={showFavoritesOnly}
              onBrowsePress={() => router.push("/(tabs)/search")}
            />
          ) : (
            <View className="gap-4">
              {filteredRecipes.map((item) => {
                const recipe = item.recipe;
                if (!recipe) return null;

                const nutrition = recipe.nutrition as any;
                const savedInfo = item.savedRecipe;

                return (
                  <Pressable
                    key={savedInfo.id}
                    onPress={() => handleRecipePress(recipe)}
                    style={({ pressed }) => ({
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      opacity: pressed ? 0.7 : 1,
                    })}
                    className="rounded-2xl p-4 border"
                  >
                    <View className="flex-row justify-between items-start mb-3">
                      <View className="flex-1 pr-4">
                        <Text className="text-xl font-bold text-foreground mb-1">
                          {recipe.name}
                        </Text>
                        {recipe.cuisineType && (
                          <View className="flex-row items-center gap-2 mt-1">
                            <View 
                              style={{ backgroundColor: `${colors.primary}15` }}
                              className="px-2 py-1 rounded-full"
                            >
                              <Text 
                                style={{ color: colors.primary }}
                                className="text-xs font-semibold"
                              >
                                {recipe.cuisineType}
                              </Text>
                            </View>
                            {recipe.difficulty && (
                              <Text className="text-xs text-muted capitalize">
                                {recipe.difficulty}
                              </Text>
                            )}
                          </View>
                        )}
                      </View>
                      <Text className="text-2xl">{savedInfo.isFavorite ? "❤️" : "🤍"}</Text>
                    </View>

                    {/* Recipe Stats */}
                    <View className="flex-row gap-3 mb-3">
                      {recipe.prepTime && (
                        <View className="flex-row items-center gap-1">
                          <Text className="text-xs text-muted">⏱️</Text>
                          <Text className="text-xs text-muted">{recipe.prepTime}m prep</Text>
                        </View>
                      )}
                      {recipe.cookTime && (
                        <View className="flex-row items-center gap-1">
                          <Text className="text-xs text-muted">🔥</Text>
                          <Text className="text-xs text-muted">{recipe.cookTime}m cook</Text>
                        </View>
                      )}
                      {recipe.servings && (
                        <View className="flex-row items-center gap-1">
                          <Text className="text-xs text-muted">🍽️</Text>
                          <Text className="text-xs text-muted">{recipe.servings} servings</Text>
                        </View>
                      )}
                    </View>

                    {/* Nutrition */}
                    {nutrition && (
                      <View className="flex-row gap-3">
                        <View 
                          style={{ backgroundColor: colors.border }}
                          className="flex-1 rounded-lg p-2 items-center"
                        >
                          <Text className="text-xs text-muted">Calories</Text>
                          <Text 
                            style={{ color: colors.foreground }}
                            className="text-sm font-bold mt-1"
                          >
                            {nutrition.calories}
                          </Text>
                        </View>
                        <View 
                          style={{ backgroundColor: colors.border }}
                          className="flex-1 rounded-lg p-2 items-center"
                        >
                          <Text className="text-xs text-muted">Protein</Text>
                          <Text 
                            style={{ color: colors.foreground }}
                            className="text-sm font-bold mt-1"
                          >
                            {nutrition.protein}g
                          </Text>
                        </View>
                        <View 
                          style={{ backgroundColor: colors.border }}
                          className="flex-1 rounded-lg p-2 items-center"
                        >
                          <Text className="text-xs text-muted">Carbs</Text>
                          <Text 
                            style={{ color: colors.foreground }}
                            className="text-sm font-bold mt-1"
                          >
                            {nutrition.carbs}g
                          </Text>
                        </View>
                        <View 
                          style={{ backgroundColor: colors.border }}
                          className="flex-1 rounded-lg p-2 items-center"
                        >
                          <Text className="text-xs text-muted">Fat</Text>
                          <Text 
                            style={{ color: colors.foreground }}
                            className="text-sm font-bold mt-1"
                          >
                            {nutrition.fat}g
                          </Text>
                        </View>
                      </View>
                    )}

                    {/* User Notes */}
                    {savedInfo.notes && (
                      <View 
                        style={{ backgroundColor: `${colors.primary}10`, borderColor: `${colors.primary}30` }}
                        className="mt-3 p-3 rounded-lg border"
                      >
                        <Text className="text-xs text-muted mb-1">My Notes:</Text>
                        <Text className="text-sm text-foreground">{savedInfo.notes}</Text>
                      </View>
                    )}
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
