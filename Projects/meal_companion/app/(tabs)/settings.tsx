import { View, Text, ScrollView, Pressable, Alert, Switch, SectionList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useThemeContext } from "@/lib/theme-provider";
import { FadeInScreen } from "@/lib/screen-transitions";

interface SettingRow {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: "action" | "toggle";
  value?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface SettingSection {
  title: string;
  data: SettingRow[];
}

export default function SettingsScreen() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const { setColorScheme } = useThemeContext();
  const [notifications, setNotifications] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === "dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [privateMode, setPrivateMode] = useState(false);

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    setColorScheme(value ? "dark" : "light");
  };

  const sections: SettingSection[] = [
    {
      title: "Account & Profile",
      data: [
        {
          id: "account",
          icon: "👤",
          title: "Account",
          subtitle: "Profile, email, password",
          type: "action",
          onPress: () => Alert.alert("Account", "Manage your account settings"),
        },
        {
          id: "dietary",
          icon: "🥗",
          title: "Dietary Preferences",
          subtitle: "Allergies, goals, macros",
          type: "action",
          onPress: () => Alert.alert("Dietary", "Customize your dietary profile"),
        },
      ],
    },
    {
      title: "Notifications & Alerts",
      data: [
        {
          id: "notifications",
          icon: "🔔",
          title: "Notifications",
          subtitle: "Meal reminders and alerts",
          type: "toggle",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          id: "location",
          icon: "📍",
          title: "Location Services",
          subtitle: "GPS-based shopping alerts",
          type: "toggle",
          value: locationEnabled,
          onToggle: setLocationEnabled,
        },
        {
          id: "sound",
          icon: "🔊",
          title: "Sound Effects",
          subtitle: "Audio feedback for actions",
          type: "toggle",
          value: soundEnabled,
          onToggle: setSoundEnabled,
        },
      ],
    },
    {
      title: "Privacy & Security",
      data: [
        {
          id: "privacy",
          icon: "🛡️",
          title: "Privacy",
          subtitle: "Data collection and usage",
          type: "action",
          onPress: () => Alert.alert("Privacy", "Review our privacy policy"),
        },
        {
          id: "private",
          icon: "🔒",
          title: "Private Mode",
          subtitle: "Enhanced privacy settings",
          type: "toggle",
          value: privateMode,
          onToggle: setPrivateMode,
        },
      ],
    },
    {
      title: "Display & Theme",
      data: [
        {
          id: "darkmode",
          icon: "🌙",
          title: "Dark Mode",
          subtitle: `Currently: ${darkMode ? "Enabled" : "Disabled"}`,
          type: "toggle",
          value: darkMode,
          onToggle: handleDarkModeToggle,
        },
      ],
    },
    {
      title: "Help & Support",
      data: [
        {
          id: "support",
          icon: "💬",
          title: "Support",
          subtitle: "Contact our help team",
          type: "action",
          onPress: () => Alert.alert("Support", "Email: support@aimeals.com"),
        },
        {
          id: "about",
          icon: "ℹ️",
          title: "About",
          subtitle: "Version 1.0.0 • Build 2026",
          type: "action",
          onPress: () => Alert.alert("About", "AI Meal Companion v1.0.0"),
        },
      ],
    },
  ];

  const renderSettingRow = (row: SettingRow) => {
    if (row.type === "toggle") {
      return (
        <Pressable
          key={row.id}
          style={({ pressed }) => [{
            backgroundColor: colors.surface,
            opacity: pressed ? 0.85 : 1,
          }]}
          className="flex-row items-center justify-between px-6 py-5 border-b border-border last:border-b-0"
        >
          <View className="flex-1 flex-row items-center gap-4">
            <Text className="text-2xl">{row.icon}</Text>
            <View className="flex-1">
              <Text style={{ color: colors.foreground }} className="text-base font-semibold">
                {row.title}
              </Text>
              {row.subtitle && (
                <Text className="text-xs text-muted mt-1">{row.subtitle}</Text>
              )}
            </View>
          </View>
          <Switch
            value={row.value || false}
            onValueChange={row.onToggle || (() => {})}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={row.value ? colors.background : colors.muted}
            style={{ marginLeft: 12 }}
          />
        </Pressable>
      );
    }

    return (
      <Pressable
        key={row.id}
        onPress={row.onPress}
        style={({ pressed }) => [{
          backgroundColor: colors.surface,
          opacity: pressed ? 0.85 : 1,
        }]}
        className="flex-row items-center justify-between px-6 py-5 border-b border-border last:border-b-0"
      >
        <View className="flex-1 flex-row items-center gap-4">
          <Text className="text-2xl">{row.icon}</Text>
          <View className="flex-1">
            <Text style={{ color: colors.foreground }} className="text-base font-semibold">
              {row.title}
            </Text>
            {row.subtitle && (
              <Text className="text-xs text-muted mt-1">{row.subtitle}</Text>
            )}
          </View>
        </View>
        <Text style={{ color: colors.muted }} className="text-xl">→</Text>
      </Pressable>
    );
  };

  return (
    <FadeInScreen>
    <ScreenContainer className="bg-background">
      <View 
        style={{ 
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        }} 
        className="px-6 py-4"
      >
        <Text style={{ color: colors.foreground }} className="text-3xl font-bold">Settings</Text>
        <Text className="text-sm text-muted mt-2">Personalize your AI Meal Companion experience</Text>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8 gap-6">
          {sections.map((section, idx) => (
            <View key={idx} className="gap-3">
              <Text 
                style={{ color: colors.primary }} 
                className="text-xs font-bold uppercase tracking-wider px-2"
              >
                {section.title}
              </Text>
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
                className="rounded-2xl overflow-hidden"
              >
                {section.data.map((row, itemIdx) => (
                  <View
                    key={row.id}
                    style={{
                      borderBottomWidth: itemIdx === section.data.length - 1 ? 0 : 1,
                      borderBottomColor: colors.border,
                    }}
                  >
                    {renderSettingRow(row)}
                  </View>
                ))}
              </View>
            </View>
          ))}

          {/* Logout Button */}
          <View className="gap-3 mt-6">
            <Pressable
              onPress={() => Alert.alert("Sign Out", "You have been signed out.", [{ text: "OK" }])}
              style={({ pressed }) => [{
                backgroundColor: colors.error,
                opacity: pressed ? 0.9 : 1,
              }]}
              className="rounded-2xl py-5 items-center justify-center"
            >
              <Text className="text-lg font-bold text-background">Sign Out</Text>
            </Pressable>

            <Text className="text-xs text-muted text-center mt-6 mb-4">
              Version 1.0.0 • © 2026 AI Meal Companion
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
    </FadeInScreen>
  );
}

