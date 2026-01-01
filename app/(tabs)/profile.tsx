import { View, Text, ScrollView, Pressable, Switch } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

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
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    { icon: "house.fill", label: "Dietary Preferences", value: "Vegetarian, Gluten-Free" },
    { icon: "paperplane.fill", label: "Saved Recipes", value: "12 recipes" },
    { icon: "chevron.right", label: "Meal History", value: "45 meals tracked" },
    { icon: "chevron.right", label: "About & Support", value: "" },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Profile Header */}
          <View className="items-center gap-4">
            <View className="w-20 h-20 bg-primary rounded-full items-center justify-center">
              <Text className="text-4xl">👨‍🍳</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground">John Doe</Text>
              <Text className="text-sm text-muted mt-1">Weight Loss Track</Text>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center">
              <Text className="text-2xl font-bold text-primary">45</Text>
              <Text className="text-xs text-muted mt-1">Meals Tracked</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center">
              <Text className="text-2xl font-bold text-primary">12</Text>
              <Text className="text-xs text-muted mt-1">Saved Recipes</Text>
            </View>
            <View className="flex-1 bg-surface rounded-lg p-4 border border-border items-center">
              <Text className="text-2xl font-bold text-primary">8</Text>
              <Text className="text-xs text-muted mt-1">Day Streak</Text>
            </View>
          </View>

          {/* Settings Section */}
          <View className="gap-4">
            <Text className="text-lg font-bold text-foreground">Settings</Text>

            {/* Notifications */}
            <View className="flex-row items-center justify-between bg-surface rounded-lg p-4 border border-border">
              <View className="flex-row items-center gap-3">
                <IconSymbol name="paperplane.fill" size={20} color={colors.primary} />
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
            <View className="flex-row items-center justify-between bg-surface rounded-lg p-4 border border-border">
              <View className="flex-row items-center gap-3">
                <IconSymbol name="paperplane.fill" size={20} color={colors.primary} />
                <View>
                  <Text className="text-base font-semibold text-foreground">Location Services</Text>
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
            <View className="flex-row items-center justify-between bg-surface rounded-lg p-4 border border-border">
              <View className="flex-row items-center gap-3">
                <IconSymbol name="paperplane.fill" size={20} color={colors.primary} />
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
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                className="flex-row items-center justify-between bg-surface rounded-lg p-4 border border-border"
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
                  <View>
                    <Text className="text-base font-semibold text-foreground">{item.label}</Text>
                    {item.value && (
                      <Text className="text-xs text-muted mt-1">{item.value}</Text>
                    )}
                  </View>
                </View>
                <IconSymbol name="chevron.right" size={20} color={colors.muted} />
              </Pressable>
            ))}
          </View>

          {/* Logout Button */}
          <Pressable
            style={({ pressed }) => [{
              backgroundColor: colors.error,
              opacity: pressed ? 0.9 : 1,
            }]}
            className="rounded-lg py-3 items-center justify-center mt-4"
          >
            <Text className="text-base font-semibold text-background">Sign Out</Text>
          </Pressable>

          {/* App Version */}
          <Text className="text-xs text-muted text-center mt-4">
            AI Meal Companion v1.0.0
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
