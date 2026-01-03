import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
  FadeIn,
  FadeOut,
  SlideInRight,
  SlideOutLeft,
  SlideInUp,
  SlideOutDown,
} from "react-native-reanimated";
import { ViewStyle } from "react-native";

/**
 * Screen Transition Animations
 * 
 * Provides smooth transitions for screens and modals
 * Based on iOS-style animations
 */

interface AnimatedScreenProps {
  children: React.ReactNode;
  type?: "fade" | "slide" | "modal";
  style?: ViewStyle;
}

/**
 * FadeInScreen
 * Fades in from transparent to opaque
 * Duration: 300ms
 */
export function FadeInScreen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.out(Easing.cubic))}
      exiting={FadeOut.duration(200).easing(Easing.in(Easing.cubic))}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * SlideInScreen  
 * Slides in from right (iOS-style push)
 * Duration: 350ms
 */
export function SlideInScreen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <Animated.View
      entering={SlideInRight.duration(350).easing(Easing.out(Easing.cubic))}
      exiting={SlideOutLeft.duration(250).easing(Easing.in(Easing.cubic))}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * ModalScreen
 * Slides up from bottom (modal presentation)
 * Duration: 400ms
 */
export function ModalScreen({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <Animated.View
      entering={SlideInUp.duration(400).easing(Easing.out(Easing.cubic))}
      exiting={SlideOutDown.duration(300).easing(Easing.in(Easing.cubic))}
      style={[{ flex: 1 }, style]}
    >
      {children}
    </Animated.View>
  );
}

/**
 * AnimatedScreen
 * Universal screen wrapper with configurable animation type
 */
export function AnimatedScreen({ children, type = "fade", style }: AnimatedScreenProps) {
  switch (type) {
    case "slide":
      return <SlideInScreen style={style}>{children}</SlideInScreen>;
    case "modal":
      return <ModalScreen style={style}>{children}</ModalScreen>;
    case "fade":
    default:
      return <FadeInScreen style={style}>{children}</FadeInScreen>;
  }
}

/**
 * ScaleInView
 * Scales in from 0.95 to 1.0 with fade
 * Great for modals and cards
 */
export function ScaleInView({ children, style, delay = 0 }: { 
  children: React.ReactNode; 
  style?: ViewStyle;
  delay?: number;
}) {
  const scale = useSharedValue(0.95);
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * StaggeredList
 * Animates list items with stagger delay
 * Each item fades in with slight delay
 */
export function StaggeredListItem({
  children,
  index,
  delay = 50,
  style,
}: {
  children: React.ReactNode;
  index: number;
  delay?: number;
  style?: ViewStyle;
}) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.cubic),
      });
    }, index * delay);

    return () => clearTimeout(timer);
  }, [index, delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * PulseView
 * Gentle pulse animation
 * Great for "loading" or "active" states
 */
export function PulseView({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  const scale = useSharedValue(1);

  useEffect(() => {
    const pulse = () => {
      scale.value = withSpring(1.05, {
        damping: 10,
        stiffness: 100,
      });
      setTimeout(() => {
        scale.value = withSpring(1, {
          damping: 10,
          stiffness: 100,
        });
      }, 500);
    };

    const interval = setInterval(pulse, 1500);
    return () => clearInterval(interval);
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * SlideInFromBottom
 * Slides content up from bottom
 * Great for sheets and bottom modals
 */
export function SlideInFromBottom({
  children,
  style,
  visible = true,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  visible?: boolean;
}) {
  const translateY = useSharedValue(visible ? 0 : 300);
  const opacity = useSharedValue(visible ? 1 : 0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.cubic),
      });
      translateY.value = withSpring(0, {
        damping: 20,
        stiffness: 200,
      });
    } else {
      opacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.in(Easing.cubic),
      });
      translateY.value = withTiming(300, {
        duration: 250,
        easing: Easing.in(Easing.cubic),
      });
    }
  }, [visible, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * FadeInWithDelay
 * Fades in after specified delay
 * Great for sequential reveals
 */
export function FadeInWithDelay({
  children,
  delay = 0,
  duration = 300,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  style?: ViewStyle;
}) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

/**
 * Pre-configured animation presets
 */
export const AnimationPresets = {
  // Screen transitions
  screenFade: FadeIn.duration(300).easing(Easing.out(Easing.cubic)),
  screenSlideRight: SlideInRight.duration(350).easing(Easing.out(Easing.cubic)),
  screenModal: SlideInUp.duration(400).easing(Easing.out(Easing.cubic)),

  // Exit animations
  exitFade: FadeOut.duration(200).easing(Easing.in(Easing.cubic)),
  exitSlideLeft: SlideOutLeft.duration(250).easing(Easing.in(Easing.cubic)),
  exitSlideDown: SlideOutDown.duration(300).easing(Easing.in(Easing.cubic)),

  // Timings
  timing: {
    quick: 200,
    standard: 300,
    slow: 500,
  },

  // Easing functions
  easing: {
    easeInOut: Easing.bezier(0.42, 0, 0.58, 1),
    easeOut: Easing.out(Easing.cubic),
    easeIn: Easing.in(Easing.cubic),
    spring: {
      damping: 15,
      stiffness: 150,
    },
  },
};
