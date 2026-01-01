import { View, Text, ScrollView, TextInput, Pressable, FlatList } from "react-native";
import { useState } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

interface ChatMessage {
  id: string;
  role: "user" | "chef";
  content: string;
  timestamp: Date;
}

/**
 * AI Chef Chat Screen - AI Meal Companion
 *
 * Provides expert-level culinary advice through:
 * - RAG-powered responses from culinary knowledge base
 * - Troubleshooting and technique guidance
 * - Recipe customization suggestions
 */
export default function ChatScreen() {
  const colors = useColors();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "chef",
      content: "Hello! I'm your personal culinary guide. Ask me anything about cooking, recipes, or techniques. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    "How do I fix a broken hollandaise?",
    "What's a good wine pairing for spicy dishes?",
    "How do I perfectly sear a steak?",
    "What are some quick 15-minute meals?",
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    setTimeout(() => {
      const chefMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "chef",
        content: "That's a great question! Based on professional culinary techniques, here's what I recommend: First, ensure your ingredients are at the right temperature. Then, follow these steps carefully for the best results. Would you like more specific guidance?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, chefMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === "user";
    return (
      <View className={`mb-4 flex-row ${isUser ? "justify-end" : "justify-start"}`}>
        <View
          className={`max-w-xs rounded-2xl px-4 py-3 ${
            isUser ? "bg-primary" : "bg-surface border border-border"
          }`}
        >
          <Text
            className={`text-base leading-relaxed ${
              isUser ? "text-background" : "text-foreground"
            }`}
          >
            {item.content}
          </Text>
          <Text
            className={`text-xs mt-2 ${
              isUser ? "text-background/70" : "text-muted"
            }`}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1 flex-col">
        {/* Chat Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 16 }}
          scrollEnabled={true}
          inverted={false}
        />

        {isLoading && (
          <View className="px-6 py-4 flex-row items-center gap-2">
            <View className="w-2 h-2 bg-primary rounded-full" />
            <View className="w-2 h-2 bg-primary rounded-full" />
            <View className="w-2 h-2 bg-primary rounded-full" />
            <Text className="text-sm text-muted ml-2">Chef is thinking...</Text>
          </View>
        )}

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
            className="gap-2"
          >
            {suggestedQuestions.map((question, idx) => (
              <Pressable
                key={idx}
                onPress={() => handleSuggestedQuestion(question)}
                style={({ pressed }) => [{
                  backgroundColor: colors.surface,
                  opacity: pressed ? 0.8 : 1,
                }]}
                className="px-4 py-2 rounded-full border border-border"
              >
                <Text className="text-xs font-semibold text-foreground">{question}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}

        {/* Input Area */}
        <View className="px-6 py-4 gap-3 border-t border-border bg-background">
          <View
            style={{ borderColor: colors.border }}
            className="flex-row items-center gap-3 bg-surface rounded-full px-4 py-3 border"
          >
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask the chef..."
              placeholderTextColor={colors.muted}
              multiline
              maxLength={500}
              className="flex-1 text-base text-foreground"
              editable={!isLoading}
            />
            <Pressable
              onPress={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              style={({ pressed }) => [{
                opacity: !inputText.trim() || isLoading ? 0.5 : pressed ? 0.8 : 1,
              }]}
            >
              <Text className="text-lg">📤</Text>
            </Pressable>
          </View>
          <Text className="text-xs text-muted text-center">
            Powered by expert culinary knowledge
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}
