import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

type OnboardingStep = "welcome" | "permissions" | "track" | "complete";

/**
 * Onboarding Flow - AI Meal Companion
 *
 * First-time user experience:
 * 1. Welcome screen
 * 2. Permissions (Camera, Location, Microphone)
 * 3. Track selection
 * 4. Completion
 */
export default function OnboardingScreen() {
  const colors = useColors();
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [permissions, setPermissions] = useState({
    camera: false,
    location: false,
    microphone: false,
  });

  const handlePermissionToggle = (permission: keyof typeof permissions) => {
    setPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  const renderWelcome = () => (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-6xl mb-4">🍽️</Text>
      <View className="gap-2 items-center">
        <Text className="text-4xl font-bold text-foreground text-center">
          Welcome to AI Meal Companion
        </Text>
        <Text className="text-base text-muted text-center leading-relaxed">
          Your personal culinary guide powered by AI. Discover recipes, get expert cooking tips,
          and enjoy personalized meal planning.
        </Text>
      </View>
      <Pressable
        onPress={() => setStep("permissions")}
        style={({ pressed }) => [{
          backgroundColor: colors.primary,
          opacity: pressed ? 0.9 : 1,
        }]}
        className="w-full rounded-lg py-4 items-center justify-center mt-4"
      >
        <Text className="text-lg font-bold text-background">Get Started</Text>
      </Pressable>
    </View>
  );

  const renderPermissions = () => (
    <View className="flex-1 gap-6 px-6 py-8">
      <View className="gap-2">
        <Text className="text-3xl font-bold text-foreground">Enable Permissions</Text>
        <Text className="text-base text-muted">
          To unlock all features, we need access to:
        </Text>
      </View>

      {/* Camera Permission */}
      <Pressable
        onPress={() => handlePermissionToggle("camera")}
        style={({ pressed }) => [{
          opacity: pressed ? 0.7 : 1,
        }]}
        className="flex-row items-center gap-4 bg-surface rounded-lg p-4 border border-border"
      >
        <Text className="text-3xl">📸</Text>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">Camera</Text>
          <Text className="text-sm text-muted mt-1">Identify meals from photos</Text>
        </View>
        <View
          style={{
            backgroundColor: permissions.camera ? colors.primary : "transparent",
            borderColor: colors.border,
          }}
          className="w-6 h-6 rounded-full border-2 items-center justify-center"
        >
          {permissions.camera && <Text className="text-sm font-bold text-background">✓</Text>}
        </View>
      </Pressable>

      {/* Location Permission */}
      <Pressable
        onPress={() => handlePermissionToggle("location")}
        style={({ pressed }) => [{
          opacity: pressed ? 0.7 : 1,
        }]}
        className="flex-row items-center gap-4 bg-surface rounded-lg p-4 border border-border"
      >
        <Text className="text-3xl">📍</Text>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">Location</Text>
          <Text className="text-sm text-muted mt-1">Shopping alerts near stores</Text>
        </View>
        <View
          style={{
            backgroundColor: permissions.location ? colors.primary : "transparent",
            borderColor: colors.border,
          }}
          className="w-6 h-6 rounded-full border-2 items-center justify-center"
        >
          {permissions.location && <Text className="text-sm font-bold text-background">✓</Text>}
        </View>
      </Pressable>

      {/* Microphone Permission */}
      <Pressable
        onPress={() => handlePermissionToggle("microphone")}
        style={({ pressed }) => [{
          opacity: pressed ? 0.7 : 1,
        }]}
        className="flex-row items-center gap-4 bg-surface rounded-lg p-4 border border-border"
      >
        <Text className="text-3xl">🎤</Text>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">Microphone</Text>
          <Text className="text-sm text-muted mt-1">Voice input for chat</Text>
        </View>
        <View
          style={{
            backgroundColor: permissions.microphone ? colors.primary : "transparent",
            borderColor: colors.border,
          }}
          className="w-6 h-6 rounded-full border-2 items-center justify-center"
        >
          {permissions.microphone && <Text className="text-sm font-bold text-background">✓</Text>}
        </View>
      </Pressable>

      <View className="flex-1" />

      <Pressable
        onPress={() => setStep("track")}
        style={({ pressed }) => [{
          backgroundColor: colors.primary,
          opacity: pressed ? 0.9 : 1,
        }]}
        className="rounded-lg py-4 items-center justify-center"
      >
        <Text className="text-lg font-bold text-background">Continue</Text>
      </Pressable>
    </View>
  );

  const renderTrackSelection = () => (
    <View className="flex-1 gap-6 px-6 py-8">
      <View className="gap-2">
        <Text className="text-3xl font-bold text-foreground">Choose Your Journey</Text>
        <Text className="text-base text-muted">
          Select a track to personalize your experience
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="gap-3">
          {[
            { emoji: "⚖️", name: "Weight Loss", color: "#FF6B6B" },
            { emoji: "💪", name: "Muscle Gain", color: "#4ECDC4" },
            { emoji: "🌍", name: "Culinary Explorer", color: "#FFD93D" },
            { emoji: "💰", name: "Budget Cooking", color: "#6BCB77" },
            { emoji: "😋", name: "Just Eating", color: "#A8E6CF" },
          ].map((track) => (
            <Pressable
              key={track.name}
              style={({ pressed }) => [{
                opacity: pressed ? 0.8 : 1,
              }]}
              className="flex-row items-center gap-4 bg-surface rounded-lg p-4 border border-border"
            >
              <Text className="text-3xl">{track.emoji}</Text>
              <Text className="text-base font-bold text-foreground flex-1">{track.name}</Text>
              <View
                style={{ backgroundColor: track.color }}
                className="w-6 h-6 rounded-full"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <Pressable
        onPress={() => setStep("complete")}
        style={({ pressed }) => [{
          backgroundColor: colors.primary,
          opacity: pressed ? 0.9 : 1,
        }]}
        className="rounded-lg py-4 items-center justify-center"
      >
        <Text className="text-lg font-bold text-background">Start Cooking</Text>
      </Pressable>
    </View>
  );

  const renderComplete = () => (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-6xl mb-4">🎉</Text>
      <View className="gap-2 items-center">
        <Text className="text-3xl font-bold text-foreground text-center">
          You're All Set!
        </Text>
        <Text className="text-base text-muted text-center leading-relaxed">
          Your AI Meal Companion is ready to help you discover amazing recipes and master the
          kitchen.
        </Text>
      </View>
      <Pressable
        style={({ pressed }) => [{
          backgroundColor: colors.primary,
          opacity: pressed ? 0.9 : 1,
        }]}
        className="w-full rounded-lg py-4 items-center justify-center mt-4"
      >
        <Text className="text-lg font-bold text-background">Start Exploring</Text>
      </Pressable>
    </View>
  );

  return (
    <ScreenContainer className="bg-background">
      {step === "welcome" && renderWelcome()}
      {step === "permissions" && renderPermissions()}
      {step === "track" && renderTrackSelection()}
      {step === "complete" && renderComplete()}
    </ScreenContainer>
  );
}
