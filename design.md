# AI Meal Companion - Mobile App Design

**Version:** 1.0  
**Date:** January 1, 2026  
**Platform:** iOS & Android (React Native)  
**Orientation:** Portrait (9:16)  
**Design Philosophy:** One-handed usage, AI-first interactions, expert-level guidance

---

## 1. Brand & Visual Identity

### App Name
**AI Meal Companion** (or "Culinary AI" as the internal codename)

### Brand Colors
- **Primary**: Deep Saffron (`#E8A63B`) - Warm, inviting, culinary
- **Secondary**: Forest Green (`#2D5016`) - Fresh, natural, ingredient-focused
- **Accent**: Burnt Orange (`#C85A17`) - Energy, passion for food
- **Background**: Cream (`#FFFAF0`) - Light, clean, approachable
- **Dark Mode Background**: Charcoal (`#1A1A1A`) - Professional, reduces eye strain
- **Text Primary**: Dark Gray (`#2C2C2C`) - Readable, warm
- **Text Secondary**: Medium Gray (`#666666`) - Subtle, hierarchical

### Typography
- **Headlines**: SF Pro Display (iOS) / Roboto Bold (Android) - 28-32px
- **Body**: SF Pro Text (iOS) / Roboto Regular (Android) - 16-18px
- **Captions**: SF Pro Text (iOS) / Roboto Regular (Android) - 12-14px

---

## 2. Screen List & Navigation Structure

### Core Screens

| Screen | Purpose | Key Features |
| :--- | :--- | :--- |
| **Home / Discovery** | Main entry point, daily recommendations | Surprise Me button, quick access to Chat, recent meals |
| **Camera / Vision** | Capture meal photos/videos | Real-time preview, meal identification, coaching overlay |
| **AI Chef Chat** | Expert culinary advice | Persistent chat, RAG-powered responses, context-aware |
| **Meal Plans** | View & manage personalized meal tracks | Weekly planner, calorie tracker, shopping list |
| **Tracks** | Choose journey (Weight Loss, Muscle Gain, etc.) | Onboarding flow, track switching, preferences |
| **Shopping List** | GPS-triggered grocery recommendations | Store proximity alerts, ingredient checkoff, price comparison |
| **Profile & Settings** | User preferences, account, dietary info | Track history, saved recipes, app settings |

### Navigation Model
- **Tab Bar** (Bottom): Home, Camera, Chat, Meals, Profile
- **Modal Flows**: Tracks selection, recipe detail, shopping list
- **Deep Links**: Share recipes, invite friends, meal plan links

---

## 3. Primary Content & Functionality

### 3.1 Home Screen
**Purpose:** Discover meals, access key features, see personalized recommendations

**Content:**
- **Hero Section**: "What's for dinner?" with Surprise Me button
- **Recent Meals**: Scrollable list of recently identified/saved meals
- **Quick Actions**: Camera icon (Identify Meal), Chat icon (Ask Chef)
- **Daily Recommendation**: AI-generated meal suggestion based on user's track and available ingredients
- **Trending**: Popular recipes from community (if social feature added later)

**Functionality:**
- Tap "Surprise Me" → LLM generates a recipe using 3-5 ingredients user inputs
- Tap "Camera" → Navigate to Vision screen
- Tap "Chat" → Navigate to AI Chef Chat
- Swipe up → View full meal history

---

### 3.2 Camera / Vision Screen
**Purpose:** Identify meals from photos/videos and provide real-time coaching

**Content:**
- **Live Camera Preview**: Full-screen camera feed with corner guides
- **Capture Button**: Large, centered button for photo capture
- **Video Mode Toggle**: Switch between photo and 5-10 second video
- **Coaching Overlay** (Video mode): Real-time text feedback from AI (e.g., "Heat is too high")
- **Identified Meal Card**: Post-capture, shows dish name, ingredients, and "Get Recipe" button

**Functionality:**
- Tap to capture photo → LLM analyzes image → Shows identified dish
- Hold to record video → LLM analyzes cooking process → Provides real-time coaching
- Tap "Get Recipe" → Generates full recipe with instructions, nutritional info
- Tap "Save" → Stores meal in history for tracking

---

### 3.3 AI Chef Chat
**Purpose:** Expert-level culinary advice, troubleshooting, technique guidance

**Content:**
- **Chat Interface**: Message bubbles, user input at bottom
- **Context Panel**: Shows current meal/recipe being discussed (if applicable)
- **Suggested Questions**: Quick-tap prompts (e.g., "How do I fix a broken sauce?")
- **Chef Persona**: Warm, encouraging tone with professional expertise

**Functionality:**
- Type or voice input → LLM retrieves relevant culinary knowledge (RAG) → Responds with expert advice
- Tap suggested question → Pre-fills input, user can modify
- Swipe up → View chat history
- Share response → Copy or send to friends

---

### 3.4 Meal Plans Screen
**Purpose:** View personalized meal plans, track calories, manage shopping

**Content:**
- **Weekly Calendar**: 7-day meal plan grid
- **Daily Breakdown**: Breakfast, Lunch, Dinner, Snacks
- **Calorie Counter**: Daily total vs. target (if on Weight Loss track)
- **Shopping List Button**: Quick access to consolidated grocery list
- **Meal Swap**: Tap any meal to swap with AI-generated alternative

**Functionality:**
- Swipe left/right → Navigate weeks
- Tap meal → View full recipe, nutritional breakdown
- Tap "Swap" → LLM generates alternative meal with same calories/macros
- Tap "Add to Shopping" → Ingredients added to consolidated list
- View progress → Charts showing adherence to track goals

---

### 3.5 Tracks Screen
**Purpose:** Choose and customize user's journey

**Content:**
- **Track Cards**: Visual cards for each track (Weight Loss, Muscle Gain, Culinary Explorer, Budget Cooking, Just Eating)
- **Track Details**: Description, example meals, target metrics
- **Customization Options**: Calorie target, dietary restrictions, cuisine preferences
- **Active Track Indicator**: Shows currently selected track

**Functionality:**
- Tap track card → View details and customize
- Confirm selection → AI adjusts all recommendations and meal generation
- Switch tracks anytime → No data loss, history preserved
- "Just Eating" track → Disables calorie tracking, focuses on flavor discovery

---

### 3.6 Shopping List Screen
**Purpose:** Consolidated grocery list with GPS-triggered alerts

**Content:**
- **Ingredient List**: Grouped by category (Produce, Dairy, Meat, Pantry)
- **Store Proximity Alert**: "You're near Whole Foods! You need 3 items here."
- **Price Comparison**: Optional integration showing prices at nearby stores
- **Checkoff System**: Tap to mark items as purchased
- **GPS Map**: Shows nearby stores with inventory status

**Functionality:**
- GPS triggers alert when user is within 500m of store
- Tap store → View which ingredients are available
- Tap ingredient → Mark as purchased or remove from list
- Share list → Send to family or roommate
- Sync across devices → If user has account

---

### 3.7 Profile & Settings Screen
**Purpose:** Account management, preferences, app settings

**Content:**
- **User Profile**: Avatar, name, current track
- **Dietary Preferences**: Allergies, restrictions, cuisines
- **Saved Recipes**: Bookmarked meals for quick access
- **Meal History**: Timeline of identified/tracked meals
- **App Settings**: Theme (light/dark), notifications, language
- **About & Support**: App version, contact support, privacy policy

**Functionality:**
- Edit profile → Update dietary info, preferences
- View history → Filter by date, cuisine, track
- Manage notifications → GPS alerts, meal reminders
- Export data → Download meal history as CSV/PDF

---

## 4. Key User Flows

### Flow 1: "Identify & Cook" (Photo)
1. User opens app → Home screen
2. Taps "Camera" icon → Camera screen
3. Frames meal → Taps capture button
4. AI identifies dish (e.g., "Chicken Tikka Masala")
5. Shows identified meal card with ingredients
6. Taps "Get Recipe" → Full recipe with instructions
7. Taps "Save" → Meal added to history

**Duration:** 30 seconds

---

### Flow 2: "Real-Time Coaching" (Video)
1. User opens app → Home screen
2. Taps "Camera" icon → Camera screen
3. Toggles to "Video Mode"
4. Starts recording cooking process (5-10 seconds)
5. AI analyzes video in real-time, shows coaching overlay (e.g., "Perfect sear!")
6. Stops recording → Shows full analysis
7. Taps "Save" → Meal added to history with coaching notes

**Duration:** 1-2 minutes

---

### Flow 3: "Surprise Me"
1. User opens app → Home screen
2. Taps "Surprise Me" button
3. Enters 3-5 ingredients they have (e.g., "Chicken, rice, tomatoes")
4. AI generates novel recipe using only those ingredients
5. Shows recipe with 5-step instructions, <30 min prep time
6. Taps "Cook" → Navigates to Camera for real-time coaching
7. Completes meal → Saves to history

**Duration:** 2-3 minutes

---

### Flow 4: "Ask the Chef"
1. User opens app → Home screen
2. Taps "Chat" icon → AI Chef Chat screen
3. Types question (e.g., "How do I fix a broken hollandaise?")
4. AI responds with expert advice, step-by-step fix
5. User follows advice, returns to chat with update
6. AI provides follow-up guidance
7. Taps "Share" → Sends response to friend

**Duration:** 3-5 minutes

---

### Flow 5: "GPS Shopping Alert"
1. User has active meal plan with shopping list
2. User is near grocery store (GPS detects)
3. App shows notification: "You're near Whole Foods! You need 3 items."
4. User taps notification → Shopping list screen
5. Sees which ingredients are available at this store
6. Checks off items as purchased
7. App updates shopping list in real-time

**Duration:** 5-10 minutes (in-store)

---

### Flow 6: "Choose a Track"
1. User opens app for first time → Onboarding
2. Sees track selection screen with 5 options
3. Taps "Weight Loss" → Customization modal
4. Sets calorie target, dietary restrictions
5. Confirms → AI adjusts all recommendations
6. Navigates to Home → Sees personalized meal suggestions
7. Can switch tracks anytime from Profile screen

**Duration:** 2-3 minutes (onboarding)

---

## 5. Interaction Patterns

### Press Feedback
- **Primary Buttons** (Surprise Me, Get Recipe): Scale 0.97 + haptic feedback
- **List Items** (Meals, Ingredients): Opacity 0.7 on press
- **Icons** (Chat, Camera): Opacity 0.6 on press

### Haptics
- Button tap: Light impact
- Toggle switch: Medium impact
- Success (recipe saved): Success notification
- Error (invalid input): Error notification

### Loading States
- **Identifying meal**: Animated spinner with "Analyzing your meal..."
- **Generating recipe**: Skeleton cards with shimmer effect
- **Chat response**: Typing indicator with "Chef is thinking..."

### Empty States
- **No meal history**: "Your culinary journey starts here. Tap Camera to identify your first meal."
- **No saved recipes**: "Save recipes to build your personal cookbook."

---

## 6. Accessibility

- **Text Sizing**: Support system font scaling (100-200%)
- **Color Contrast**: WCAG AA compliant (4.5:1 for text)
- **VoiceOver**: All interactive elements labeled
- **Voice Input**: Chat accepts voice input for hands-free operation
- **Haptics**: Toggleable for users with sensory sensitivities

---

## 7. Performance Targets

- **App Launch**: < 2 seconds
- **Camera Open**: < 1 second
- **Meal Identification**: < 3 seconds (photo), < 5 seconds (video)
- **Recipe Generation**: < 5 seconds
- **Chat Response**: < 3 seconds
- **List Scroll**: 60 FPS (smooth)

---

## 8. Onboarding Flow

1. **Welcome Screen**: App name, tagline, "Get Started" button
2. **Track Selection**: Choose journey (Weight Loss, Culinary Explorer, etc.)
3. **Customization**: Set calorie target, dietary restrictions
4. **Permissions**: Camera, Microphone, Location (GPS)
5. **Home Screen**: Ready to use

**Duration:** 2-3 minutes

---

## 9. Future Enhancements (Post-Launch)

- **Social Sharing**: Share recipes, meal photos, achievements
- **Community Ratings**: Rate and review recipes
- **Meal Prep Planning**: Batch cooking suggestions
- **Restaurant Integration**: Find nearby restaurants serving identified dishes
- **Wearable Integration**: Sync with Apple Watch, Fitbit for calorie tracking
- **Voice Commands**: "Hey Chef, what's for dinner?" voice activation

---

**Design Approval:** Ready for development phase.
