import { View, Text, ScrollView, Pressable, ActivityIndicator, RefreshControl } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { ScreenContainer } from "@/components/screen-container";
import { BackHeader } from "@/components/ui/back-header";
import { useColors } from "@/hooks/use-colors";
import { SkeletonStats, SkeletonCard } from "@/components/ui/skeleton";
import { MealHistoryEmptyState } from "@/components/ui/empty-state";
import { HapticTriggers } from "@/lib/haptic";
import { trpc } from "@/lib/trpc";

/**
 * Meal History Screen
 * 
 * Displays user's meal tracking history with:
 * - Chronological list of logged meals
 * - Nutrition information per meal
 * - Total calories tracked
 * - Filter by date range
 * - Source indicator (camera, manual, recipe)
 */
export default function MealHistoryScreen() {
  const colors = useColors();
  const router = useRouter();
  const [dateFilter, setDateFilter] = useState<"all" | "today" | "week">("all");

  const { data: meals, isLoading, refetch, isRefetching } = trpc.meals.getHistory.useQuery({ limit: 100 });

  const filteredMeals = meals?.filter(meal => {
    if (dateFilter === "all") return true;
    
    const mealDate = new Date(meal.identifiedAt);
    const now = new Date();
    
    if (dateFilter === "today") {
      return mealDate.toDateString() === now.toDateString();
    }
    
    if (dateFilter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return mealDate >= weekAgo;
    }
    
    return true;
  }) || [];

  const totalCalories = filteredMeals.reduce((sum, meal) => {
    const nutrition = meal.nutrition as any;
    return sum + (nutrition?.calories || 0);
  }, 0);

  if (isLoading) {
    return (
      <ScreenContainer className="bg-background">
        <BackHeader title="Meal History" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
          <View className="px-6 py-6 gap-6">
            {/* Stats Skeleton */}
            <SkeletonStats count={3} />

            {/* Filter Skeleton */}
            <View className="flex-row gap-2">
              <View className="flex-1 h-10 bg-border rounded-2xl" />
              <View className="flex-1 h-10 bg-border rounded-2xl" />
              <View className="flex-1 h-10 bg-border rounded-2xl" />
            </View>

            {/* Meal Cards Skeleton */}
            <SkeletonCard showImage={false} />
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
        title="Meal History"
        subtitle={`${meals?.length || 0} meals tracked`}
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
          {/* Stats Card */}
          <View 
            style={{ backgroundColor: colors.surface, borderColor: colors.border }}
            className="rounded-2xl p-4 border"
          >
            <Text className="text-base font-bold text-foreground mb-3">
              {dateFilter === "today" ? "Today's" : dateFilter === "week" ? "This Week's" : "Total"} Nutrition
            </Text>
            <View className="flex-row gap-3">
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Calories</Text>
                <Text style={{ color: colors.primary }} className="text-2xl font-bold mt-1">
                  {totalCalories}
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Meals</Text>
                <Text style={{ color: colors.primary }} className="text-2xl font-bold mt-1">
                  {filteredMeals.length}
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-muted">Avg/Meal</Text>
                <Text style={{ color: colors.primary }} className="text-2xl font-bold mt-1">
                  {filteredMeals.length > 0 ? Math.round(totalCalories / filteredMeals.length) : 0}
                </Text>
              </View>
            </View>
          </View>

          {/* Date Filter */}
          <View className="flex-row gap-3">
            {(["all", "today", "week"] as const).map((filter) => (
              <Pressable
                key={filter}
                onPress={() => {
                  HapticTriggers.itemSelect();
                  setDateFilter(filter);
                }}
                style={({ pressed }) => ({
                  flex: 1,
                  backgroundColor: dateFilter === filter ? colors.primary : colors.surface,
                  borderColor: dateFilter === filter ? colors.primary : colors.border,
                  borderWidth: 2,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
                className="rounded-2xl py-3 items-center"
              >
                <Text 
                  style={{ 
                    color: dateFilter === filter ? colors.background : colors.foreground 
                  }}
                  className="font-bold capitalize"
                >
                  {filter === "all" ? "All Time" : filter === "today" ? "Today" : "This Week"}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Meals List */}
          {filteredMeals.length === 0 ? (
            <MealHistoryEmptyState
              dateFilter={dateFilter}
              onIdentifyPress={() => router.push("/(tabs)/camera")}
            />
          ) : (
            <View className="gap-4">
              {filteredMeals.map((meal) => {
                const nutrition = meal.nutrition as any;
                const ingredients = meal.ingredients as any[];
                
                return (
                  <View
                    key={meal.id}
                    style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                    className="rounded-2xl p-4 border"
                  >
                    {/* Meal Header */}
                    <View className="flex-row justify-between items-start mb-3">
                      <View className="flex-1 pr-4">
                        <Text className="text-xl font-bold text-foreground mb-1">
                          {meal.dishName}
                        </Text>
                        <View className="flex-row items-center gap-2 mt-1">
                          {meal.cuisineType && (
                            <View 
                              style={{ backgroundColor: `${colors.primary}15` }}
                              className="px-2 py-1 rounded-full"
                            >
                              <Text 
                                style={{ color: colors.primary }}
                                className="text-xs font-semibold"
                              >
                                {meal.cuisineType}
                              </Text>
                            </View>
                          )}
                          <View 
                            style={{ backgroundColor: colors.border }}
                            className="px-2 py-1 rounded-full"
                          >
                            <Text className="text-xs text-muted capitalize">
                              {meal.source === "camera" ? "📸 Camera" : meal.source === "recipe" ? "👨‍🍳 Recipe" : "✏️ Manual"}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {meal.confidence && (
                        <View className="items-center">
                          <Text style={{ color: colors.primary }} className="text-sm font-bold">
                            {meal.confidence}%
                          </Text>
                          <Text className="text-xs text-muted">confident</Text>
                        </View>
                      )}
                    </View>

                    {/* Timestamp */}
                    <Text className="text-xs text-muted mb-3">
                      🕐 {format(new Date(meal.identifiedAt), "MMM d, yyyy 'at' h:mm a")}
                    </Text>

                    {/* Nutrition */}
                    {nutrition && (
                      <View className="flex-row gap-3 mb-3">
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

                    {/* Ingredients */}
                    {ingredients && ingredients.length > 0 && (
                      <View>
                        <Text className="text-xs text-muted mb-2">Ingredients:</Text>
                        <View className="flex-row flex-wrap gap-2">
                          {ingredients.map((ing: any, idx: number) => (
                            <View 
                              key={idx}
                              style={{ backgroundColor: `${colors.primary}10` }}
                              className="px-2 py-1 rounded-full"
                            >
                              <Text style={{ color: colors.primary }} className="text-xs">
                                {ing.name || ing}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
