import * as Haptics from "expo-haptics";

/**
 * Haptic Feedback Utility Module
 * 
 * Provides consistent haptic feedback across the app
 * Uses expo-haptics for cross-platform vibration
 * 
 * Patterns follow iOS HIG:
 * - Light: Subtle feedback for selections
 * - Medium: Normal feedback for interactions
 * - Heavy: Strong feedback for important actions
 * - Success: Confirmation of successful action
 * - Warning: Alert for warnings
 * - Error: Alert for errors
 */

export const HapticFeedback = {
  /**
   * Light haptic - Used for subtle selections
   * Examples: Tab switch, input focus, dropdown open
   */
  light: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Medium haptic - Used for normal interactions
   * Examples: Button press, item selection, toggle
   */
  medium: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Heavy haptic - Used for important/critical actions
   * Examples: Delete action, save recipe, complete meal log
   */
  heavy: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Success haptic - Positive feedback pattern
   * Examples: Recipe saved, settings updated, form submitted
   * Pattern: 2 light pulses (55ms apart)
   */
  success: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Warning haptic - Alert feedback pattern
   * Examples: Permission denied, form validation error, delete confirmation
   * Pattern: Ascending frequency pulses
   */
  warning: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Error haptic - Error feedback pattern
   * Examples: Network error, API error, authentication failure
   * Pattern: Distinctive error vibration
   */
  error: async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Double tap haptic - Two quick taps
   * Examples: Favorite toggle, quick action confirmation
   */
  doubleTap: async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      await new Promise((resolve) => setTimeout(resolve, 100));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },

  /**
   * Selection haptic - Selection feedback
   * Examples: Picker selection, date selection
   */
  selection: async () => {
    try {
      await Haptics.selectionAsync();
    } catch (error) {
      console.warn("Haptic feedback not available:", error);
    }
  },
};

/**
 * Haptic triggers for common interactions
 * These are pre-configured for specific use cases
 */
export const HapticTriggers = {
  // Screen/Navigation
  screenTransition: () => HapticFeedback.light(),
  tabSwitch: () => HapticFeedback.light(),
  backButton: () => HapticFeedback.light(),

  // Form Interactions
  inputFocus: () => HapticFeedback.light(),
  inputBlur: () => HapticFeedback.light(),
  formError: () => HapticFeedback.warning(),
  formSubmit: () => HapticFeedback.success(),
  formReset: () => HapticFeedback.light(),

  // Button/Pressable
  buttonPress: () => HapticFeedback.medium(),
  buttonLongPress: () => HapticFeedback.heavy(),
  buttonError: () => HapticFeedback.error(),

  // Selection/Toggle
  itemSelect: () => HapticFeedback.light(),
  toggleOn: () => HapticFeedback.medium(),
  toggleOff: () => HapticFeedback.medium(),
  checkboxCheck: () => HapticFeedback.light(),

  // Data Actions
  favorite: () => HapticFeedback.medium(),
  unfavorite: () => HapticFeedback.light(),
  save: () => HapticFeedback.success(),
  delete: () => HapticFeedback.heavy(),
  share: () => HapticFeedback.light(),

  // Meal Tracking
  mealIdentified: () => HapticFeedback.success(),
  mealLogged: () => HapticFeedback.success(),
  recipeSaved: () => HapticFeedback.success(),

  // Lists/Tables
  swipeAction: () => HapticFeedback.light(),
  pullToRefresh: () => HapticFeedback.medium(),
  itemDelete: () => HapticFeedback.warning(),
  reorder: () => HapticFeedback.light(),

  // Errors/Alerts
  networkError: () => HapticFeedback.error(),
  permissionDenied: () => HapticFeedback.warning(),
  validationError: () => HapticFeedback.warning(),
  criticalError: () => HapticFeedback.heavy(),

  // Confirmation
  confirm: () => HapticFeedback.success(),
  cancel: () => HapticFeedback.light(),
  delete: () => HapticFeedback.heavy(),
};

/**
 * Hook-like function for common pressable haptic feedback
 * Usage in onPress handler:
 * onPress={() => {
 *   HapticFeedback.buttonPress();
 *   // ... button action
 * }}
 */
export const withHaptic = (
  callback: () => void | Promise<void>,
  hapticType: "light" | "medium" | "heavy" | "success" | "warning" | "error" = "medium"
) => {
  return async () => {
    switch (hapticType) {
      case "light":
        await HapticFeedback.light();
        break;
      case "medium":
        await HapticFeedback.medium();
        break;
      case "heavy":
        await HapticFeedback.heavy();
        break;
      case "success":
        await HapticFeedback.success();
        break;
      case "warning":
        await HapticFeedback.warning();
        break;
      case "error":
        await HapticFeedback.error();
        break;
    }
    await callback();
  };
};
