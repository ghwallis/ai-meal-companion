import { View, Text, ScrollView, Pressable, FlatList, TextInput } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity: number;
}

/**
 * Shopping List Screen - AI Meal Companion
 *
 * Features:
 * - Consolidated shopping list from meal plans
 * - GPS-triggered store alerts
 * - Item categorization
 * - Price comparison
 * - Sharing with family
 */
export default function ShoppingListScreen() {
  const colors = useColors();
  const [items, setItems] = useState<ShoppingItem[]>([
    { id: "1", name: "Chicken Breast", category: "Meat", checked: false, quantity: 2 },
    { id: "2", name: "Salmon Fillet", category: "Meat", checked: false, quantity: 1 },
    { id: "3", name: "Broccoli", category: "Produce", checked: false, quantity: 1 },
    { id: "4", name: "Spinach", category: "Produce", checked: false, quantity: 1 },
    { id: "5", name: "Milk", category: "Dairy", checked: true, quantity: 1 },
    { id: "6", name: "Greek Yogurt", category: "Dairy", checked: false, quantity: 1 },
    { id: "7", name: "Olive Oil", category: "Pantry", checked: false, quantity: 1 },
    { id: "8", name: "Rice", category: "Pantry", checked: false, quantity: 1 },
  ]);

  const [gpsAlert, setGpsAlert] = useState(true);
  const [nearbyStore] = useState({
    name: "Whole Foods Market",
    distance: "0.3 km away",
    items: 5,
  });

  const categories = Array.from(new Set(items.map((item) => item.category)));

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const renderCategory = (category: string) => {
    const categoryItems = items.filter((item) => item.category === category);
    return (
      <View key={category} className="gap-3 mb-6">
        <Text className="text-base font-bold text-foreground">{category}</Text>
        <View className="gap-2">
          {categoryItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => toggleItem(item.id)}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              className="flex-row items-center gap-3 bg-surface rounded-lg p-4 border border-border"
            >
              <View
                style={{
                  backgroundColor: item.checked ? colors.primary : "transparent",
                  borderColor: colors.border,
                }}
                className="w-6 h-6 rounded-full border-2 items-center justify-center"
              >
                {item.checked && <Text className="text-sm font-bold text-background">✓</Text>}
              </View>
              <View className="flex-1">
                <Text
                  className={`text-base font-semibold ${
                    item.checked ? "text-muted line-through" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Text>
              </View>
              <Text className="text-sm text-muted">x{item.quantity}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  };

  const uncheckedCount = items.filter((item) => !item.checked).length;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        <View className="px-6 py-8 gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Shopping List</Text>
            <Text className="text-sm text-muted">
              {uncheckedCount} items remaining
            </Text>
          </View>

          {/* GPS Alert */}
          {gpsAlert && (
            <View className="bg-primary/10 rounded-xl p-4 border border-primary/20 flex-row items-start gap-3">
              <Text className="text-2xl">📍</Text>
              <View className="flex-1">
                <Text className="text-sm font-bold text-foreground">
                  {nearbyStore.name}
                </Text>
                <Text className="text-xs text-muted mt-1">
                  {nearbyStore.distance} • {nearbyStore.items} items you need
                </Text>
              </View>
              <Pressable
                onPress={() => setGpsAlert(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text className="text-lg">✕</Text>
              </Pressable>
            </View>
          )}

          {/* Shopping Items by Category */}
          {categories.map((category) => renderCategory(category))}

          {/* Action Buttons */}
          <View className="gap-3 mt-4">
            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.primary,
                opacity: pressed ? 0.9 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center"
            >
              <Text className="text-base font-semibold text-background">📤 Share List</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [{
                backgroundColor: colors.surface,
                opacity: pressed ? 0.8 : 1,
              }]}
              className="rounded-lg py-3 items-center justify-center border border-border"
            >
              <Text className="text-base font-semibold text-foreground">🗑️ Clear Checked</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
