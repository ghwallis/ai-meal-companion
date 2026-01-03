import { View, Text, ScrollView, Pressable, Switch, Animated, Alert } from "react-native";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { BackHeader } from "@/components/ui/back-header";
import { FadeInScreen, ScaleInView } from "@/lib/screen-transitions";
import { trpc } from "@/lib/trpc";

/**
 * Profile Screen - AI Meal Companion
 *
 * Displays:
 * - User profile information
 * - Dietary preferences and restrictions
 * - App settings and notifications
 * - Saved recipes and meal history
 */
export default function ProfileScreen() {
  const colors = useColors();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { data: savedRecipes } = trpc.recipes.getSaved.useQuery();
  const { data: mealHistory } = trpc.meals.getHistory.useQuery({ limit: 50 });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const menuItems = [
    { 
      icon: "🍽️", 
      label: "Dietary Preferences", 
      value: "Vegetarian, Gluten-Free",
      route: "/settings"
    },
    { 
      icon: "❤️", 
      label: "Saved Recipes", 
      value: `${savedRecipes?.length || 0} recipes`,
      route: "/saved-recipes"
    },
    { 
      icon: "📚", 
      label: "Meal History", 
      value: `${mealHistory?.length || 0} meals tracked`,
      route: "/meal-history"
    },
    { 
      icon: "ℹ️", 
      label: "About & Support", 
      value: "",
      route: "/about"
    },
  ];

  return (
    <FadeInScreen>
    <ScreenContainer className="bg-background">
      <BackHeader
        title="Profile"
        subtitle="Manage your profile and preferences"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
            {/* Profile Header */}
            <View className="items-center gap-4">
              <View
                style={{ backgroundColor: colors.primary }}
                className="w-20 h-20 rounded-full items-center justify-center"
              >
                <Text className="text-4xl">👨‍🍳</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-foreground">John Doe</Text>
                <Text style={{ color: colors.primary }} className="text-sm font-semibold mt-1">
                  Weight Loss Track
                </Text>
              </View>
            </View>

            {/* Quick Stats */}
            <View className="flex-row gap-3">
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-1 rounded-xl p-4 border items-center"
              >
                <Text style={{ color: colors.primary }} className="text-2xl font-bold">
                  {mealHistory?.length || 0}
                </Text>
                <Text className="text-xs text-muted mt-1">Meals Tracked</Text>
              </View>
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-1 rounded-xl p-4 border items-center"
              >
                <Text style={{ color: colors.primary }} className="text-2xl font-bold">
                  {savedRecipes?.length || 0}
                </Text>
                <Text className="text-xs text-muted mt-1">Saved Recipes</Text>
              </View>
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-1 rounded-xl p-4 border items-center"
              >
                <Text style={{ color: colors.primary }} className="text-2xl font-bold">
                  8
                </Text>
                <Text className="text-xs text-muted mt-1">Day Streak</Text>
              </View>
            </View>

            {/* Settings Section */}
            <View className="gap-4">
              <Text className="text-lg font-bold text-foreground">Settings</Text>

              {/* Notifications */}
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-row items-center justify-between rounded-xl p-4 border"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🔔</Text>
                  <Text className="text-base font-semibold text-foreground">Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.background}
                />
              </View>

              {/* Location Services */}
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-row items-center justify-between rounded-xl p-4 border"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <Text className="text-lg">📍</Text>
                  <View>
                    <Text className="text-base font-semibold text-foreground">
                      Location Services
                    </Text>
                    <Text className="text-xs text-muted mt-1">For GPS shopping alerts</Text>
                  </View>
                </View>
                <Switch
                  value={locationEnabled}
                  onValueChange={setLocationEnabled}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.background}
                />
              </View>

              {/* Dark Mode */}
              <View
                style={{ backgroundColor: colors.surface, borderColor: colors.border }}
                className="flex-row items-center justify-between rounded-xl p-4 border"
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-lg">🌙</Text>
                  <Text className="text-base font-semibold text-foreground">Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.background}
                />
              </View>
            </View>

            {/* Menu Items */}
            <View className="gap-3">
              <Text className="text-lg font-bold text-foreground">Account</Text>
              {menuItems.map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => {
                    if (item.route) {
                      router.push(item.route as any);
                    } else {
                      Alert.alert(item.label, "Navigation coming soon.");
                    }
                  }}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  className="flex-row items-center justify-between bg-surface rounded-xl p-4 border border-border"
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <Text className="text-lg">{item.icon}</Text>
                    <View>
                      <Text className="text-base font-semibold text-foreground">
                        {item.label}
                      </Text>
                      {item.value && (
                        <Text className="text-xs text-muted mt-1">{item.value}</Text>
                      )}
                    </View>
                  </View>
                  <Text className="text-lg">→</Text>
                </Pressable>
              ))}
            </View>

            {/* Logout Button */}
            <Pressable
              onPress={() => Alert.alert("Signed out", "You have been signed out.")}
              style={({ pressed }) => [{
                backgroundColor: colors.error,
                opacity: pressed ? 0.9 : 1,
              }]}
              className="rounded-xl py-3 items-center justify-center mt-4"
            >
              <Text className="text-base font-bold text-background">Sign Out</Text>
            </Pressable>

            {/* App Version */}
            <Text className="text-xs text-muted text-center mt-4">
              AI Meal Companion v1.0.0
            </Text>
          </View>
        </ScrollView>
    </ScreenContainer>
    </FadeInScreen>
  );
}
