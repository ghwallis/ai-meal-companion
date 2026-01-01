import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface MealPlan {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  calories: number;
  target: number;
}

/**
 * Meal Plans Screen - AI Meal Companion
 *
 * Displays:
 * - Weekly meal plan calendar
 * - Daily calorie tracking
 * - Meal swapping and customization
 * - Shopping list integration
 */
export default function MealsScreen() {
  const colors = useColors();
  const [selectedDay, setSelectedDay] = useState(0);
  const [mealPlans] = useState<MealPlan[]>([
    {
      day: "Monday",
      breakfast: "Oatmeal with Berries",
      lunch: "Grilled Chicken Salad",
      dinner: "Salmon with Vegetables",
      calories: 1850,
      target: 2000,
    },
    {
      day: "Tuesday",
      breakfast: "Egg Scramble",
      lunch: "Turkey Sandwich",
      dinner: "Pasta Primavera",
      calories: 1920,
      target: 2000,
    },
    {
      day: "Wednesday",
      breakfast: "Greek Yogurt Parfait",
      lunch: "Quinoa Bowl",
      dinner: "Beef Stir Fry",
      calories: 1780,
      target: 2000,
    },
    {
      day: "Thursday",
      breakfast: "Smoothie Bowl",
      lunch: "Chicken Wrap",
      dinner: "Fish Tacos",
      calories: 1920,
      target: 2000,
    },
    {
      day: "Friday",
      breakfast: "Pancakes",
      lunch: "Sushi Bowl",
      dinner: "Vegetable Curry",
      calories: 2050,
      target: 2000,
    },
    {
      day: "Saturday",
      breakfast: "French Toast",
      lunch: "Burger",
      dinner: "Pizza",
      calories: 2200,
      target: 2000,
    },
    {
      day: "Sunday",
      breakfast: "Brunch Eggs",
      lunch: "Roast Chicken",
      dinner: "Pasta Carbonara",
      calories: 2100,
      target: 2000,
    },
  ]);

  const currentPlan = mealPlans[selectedDay];
  const caloriePercentage = (currentPlan.calories / currentPlan.target) * 100;

  const renderDayButton = (day: string, index: number) => (
    <Pressable
      key={index}
      onPress={() => setSelectedDay(index)}
      style={({ pressed }) => [{
        backgroundColor: selectedDay === index ? colors.primary : colors.surface,
        opacity: pressed ? 0.8 : 1,
      }]}
      className="rounded-lg py-2 px-3 border border-border items-center justify-center"
    >
      <Text className={`text-xs font-semibold ${selectedDay === index ? "text-background" : "text-foreground"}`}>
        {day.slice(0, 3)}
      </Text>
    </Pressable>
  );

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Week Navigation */}
          <View>
            <Text className="text-lg font-bold text-foreground mb-3">This Week</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 8 }}
            >
              {mealPlans.map((plan, idx) => renderDayButton(plan.day, idx))}
            </ScrollView>
          </View>

          {/* Selected Day Card */}
          <View className="bg-surface rounded-2xl p-6 border border-border">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-2xl font-bold text-foreground">{currentPlan.day}</Text>
              <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
                <IconSymbol name="chevron.right" size={24} color={colors.primary} />
              </Pressable>
            </View>

            {/* Meals */}
            <View className="gap-4 mb-6">
              {[
                { label: "Breakfast", meal: currentPlan.breakfast },
                { label: "Lunch", meal: currentPlan.lunch },
                { label: "Dinner", meal: currentPlan.dinner },
              ].map((item, idx) => (
                <Pressable
                  key={idx}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  className="flex-row items-center justify-between p-3 bg-background rounded-lg border border-border"
                >
                  <View>
                    <Text className="text-xs font-semibold text-muted">{item.label}</Text>
                    <Text className="text-base font-semibold text-foreground mt-1">{item.meal}</Text>
                  </View>
                  <Text className="text-lg">→</Text>
                </Pressable>
              ))}
            </View>

            {/* Calorie Tracker */}
            <View className="gap-2">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-foreground">Calories</Text>
                <Text className="text-sm font-bold text-primary">
                  {currentPlan.calories} / {currentPlan.target}
                </Text>
              </View>
              <View className="h-2 bg-background rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${Math.min(caloriePercentage, 100)}%`,
                    backgroundColor: caloriePercentage > 100 ? colors.error : colors.primary,
                  }}
                  className="h-full"
                />
              </View>
              <Text className="text-xs text-muted">
                {caloriePercentage > 100
                  ? `${Math.round(caloriePercentage - 100)}% over target`
                  : `${Math.round(100 - caloriePercentage)}% remaining`}
              </Text>
            </View>
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
              <Text className="text-base font-semibold text-background">📋 View Shopping List</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className="text-base font-semibold text-foreground">🔄 Swap Meals</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className="text-base font-semibold text-foreground">📊 View Progress</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
