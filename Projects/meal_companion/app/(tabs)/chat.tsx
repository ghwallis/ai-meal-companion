import { View, Text, ScrollView, TextInput, Pressable, FlatList, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";
import { FadeInScreen } from "@/lib/screen-transitions";
import { trpc } from "@/lib/trpc";

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
 * - Real LLM responses powered by OpenAI/Gemini
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // tRPC mutation for chat
  const chatMutation = trpc.ai.chat.useMutation();

  const suggestedQuestions = [
    "How do I fix a broken hollandaise?",
    "What's a good wine pairing for spicy dishes?",
    "How do I perfectly sear a steak?",
    "What are some quick 15-minute meals?",
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSendMessage = async () => {
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

    try {
      // Format messages for API
      const apiMessages = messages
        .filter((m) => m.role !== undefined)
        .map((m) => ({
          role: m.role === "chef" ? "assistant" : "user",
          content: m.content,
        }))
        .concat({
          role: "user",
          content: inputText,
        });

      // Call LLM API via tRPC
      const response = await chatMutation.mutateAsync({
        messages: apiMessages as Array<{
          role: "user" | "assistant" | "system";
          content: string;
        }>,
        context: {
          currentMeal: undefined,
          journey: "balanced",
          restrictions: [],
        },
      });

      const chefMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "chef",
        content: response.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, chefMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "chef",
        content:
          "Sorry, I encountered an issue getting a response. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isUser = item.role === "user";
    return (
      <View className={`mb-4 flex-row ${isUser ? "justify-end" : "justify-start"}`}>
        <View
          style={{
            backgroundColor: isUser ? colors.primary : colors.surface,
            maxWidth: "85%",
            borderColor: isUser ? colors.primary : colors.border,
            borderWidth: 1,
            shadowColor: isUser ? colors.primary : colors.foreground,
            shadowOpacity: isUser ? 0.2 : 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
          className="rounded-2xl px-4 py-3"
        >
          {!isUser && (
            <Text style={{ color: colors.primary }} className="text-xs font-bold mb-1">
              👨‍🍳 Chef
            </Text>
          )}
          <Text
            style={{
              color: isUser ? colors.background : colors.foreground,
            }}
            className="text-base leading-relaxed"
          >
            {item.content}
          </Text>
          <Text
            style={{
              color: isUser ? colors.background + "B3" : colors.muted,
            }}
            className="text-xs mt-2"
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
    <FadeInScreen>
    <ScreenContainer className="bg-background">
      <Animated.View
        style={{
          opacity: fadeAnim,
          flex: 1,
        }}
        className="flex-1 flex-col"
      >
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
            <View
              style={{ backgroundColor: colors.primary }}
              className="w-2 h-2 rounded-full"
            />
            <View
              style={{ backgroundColor: colors.primary }}
              className="w-2 h-2 rounded-full"
            />
            <View
              style={{ backgroundColor: colors.primary }}
              className="w-2 h-2 rounded-full"
            />
            <Text className="text-sm text-muted ml-2">Chef is thinking...</Text>
          </View>
        )}

        {/* Suggested Questions */}
        {messages.length <= 1 && (
          <View className="px-6 mb-6 gap-3">
            <Text style={{ color: colors.foreground }} className="text-base font-bold">
              💡 Popular questions
            </Text>
            <View className="gap-3">
              {suggestedQuestions.map((question, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleSuggestedQuestion(question)}
                  style={
                    ({ pressed }) => ({
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      borderWidth: 1,
                      opacity: pressed ? 0.8 : 1,
                      shadowColor: colors.foreground,
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      shadowOffset: { width: 0, height: 1 },
                    })
                  }
                  className="px-4 py-3 rounded-2xl"
                >
                  <Text style={{ color: colors.foreground }} className="text-sm leading-relaxed">
                    {question}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {/* Input Area */}
        <View
          style={{ borderTopColor: colors.border }}
          className="px-6 py-4 gap-3 border-t bg-background"
        >
          <View
            style={{
              borderColor: inputText.trim() ? colors.primary : colors.border,
              backgroundColor: colors.surface,
              borderWidth: 2,
            }}
            className="flex-row items-center gap-3 rounded-2xl px-4 py-3"
          >
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask about cooking, recipes, techniques..."
              placeholderTextColor={colors.muted}
              multiline
              maxLength={500}
              className="flex-1 text-base text-foreground min-h-[44px] max-h-[120px]"
              style={{ color: colors.foreground }}
              editable={!isLoading}
            />
          </View>
          <Pressable
            onPress={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            style={
              ({ pressed }) => ({
                backgroundColor:
                  !inputText.trim() || isLoading ? colors.surface : colors.primary,
                opacity:
                  pressed && inputText.trim() && !isLoading ? 0.9 : 1,
                shadowColor: colors.primary,
                shadowOpacity:
                  inputText.trim() && !isLoading ? 0.3 : 0,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: inputText.trim() && !isLoading ? 4 : 0,
              })
            }
            className="rounded-2xl py-4 items-center"
          >
            <Text
              className="text-base font-bold"
              style={{
                color:
                  !inputText.trim() || isLoading
                    ? colors.muted
                    : colors.background,
              }}
            >
              Send
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </ScreenContainer>
    </FadeInScreen>
  );
}
