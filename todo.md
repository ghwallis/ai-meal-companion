# AI Meal Companion - Development TODO

## Project Overview
An AI-native mobile food companion featuring real-time video cooking coaching, GPS-embedded shopping alerts, expert AI chat, and personalized meal tracks for iOS and Android.

---

## Phase 1: Foundation & Core Intelligence

### Core Setup
- [ ] Configure app branding (app name, logo, colors in app.config.ts)
- [ ] Set up theme colors in theme.config.js (Saffron, Forest Green, Burnt Orange)
- [ ] Create app icon and splash screen assets
- [ ] Set up environment variables for LLM API keys (OpenAI/Gemini)
- [ ] Initialize backend LLM service integration

### Navigation & Screens
- [ ] Implement tab bar navigation (Home, Camera, Chat, Meals, Profile)
- [ ] Create Home screen with Surprise Me button and quick actions
- [ ] Create Camera screen with photo/video capture UI
- [ ] Create AI Chef Chat screen with message interface
- [ ] Create Meal Plans screen with weekly calendar
- [ ] Create Tracks screen with journey selection
- [ ] Create Shopping List screen with GPS alerts
- [ ] Create Profile & Settings screen

### Core Features
- [ ] Implement "Surprise Me" feature (ingredient input → recipe generation)
- [ ] Implement basic meal identification (photo capture → LLM analysis)
- [ ] Implement AI Chef Chat (text input → LLM response with RAG)
- [ ] Set up local AsyncStorage for meal history and user preferences
- [ ] Create onboarding flow (welcome → track selection → permissions)

---

## Phase 2: Multimodal & Spatial Integration

### Vision & Video
- [ ] Integrate multimodal LLM for advanced meal identification
- [ ] Implement real-time video analysis for cooking coaching
- [ ] Add real-time coaching overlay on video feed
- [ ] Create "Reverse Recipe" generation from identified meals
- [ ] Implement video storage and playback for meal history

### GPS & Location
- [ ] Integrate native GPS/geolocation API
- [ ] Implement store proximity detection (500m radius)
- [ ] Create GPS-triggered shopping alerts
- [ ] Integrate Google Maps API for store discovery
- [ ] Add store inventory integration (if available)
- [ ] Implement restaurant discovery based on identified meals

### Permissions & Security
- [ ] Request camera permissions (iOS/Android)
- [ ] Request microphone permissions for voice chat
- [ ] Request location permissions for GPS features
- [ ] Implement secure storage for API keys and user data
- [ ] Add privacy policy and terms of service screens

---

## Phase 3: Personalization & UX Refinement

### Tracks System
- [ ] Implement track selection logic (Weight Loss, Muscle Gain, Culinary Explorer, Budget Cooking, Just Eating)
- [ ] Create track-specific prompt engineering for LLM
- [ ] Implement track switching without data loss
- [ ] Add track customization (calorie targets, dietary restrictions)

### Calorie & Progress Tracking
- [ ] Implement calorie tracking for Weight Loss track
- [ ] Create nutritional breakdown UI
- [ ] Add progress charts and analytics
- [ ] Implement daily/weekly goal tracking
- [ ] Create progress notifications and reminders

### Recipe Generation & Customization
- [ ] Implement dynamic recipe generation based on user track
- [ ] Add recipe customization UI (servings, dietary modifications)
- [ ] Create recipe sharing functionality
- [ ] Implement recipe saving and bookmarking
- [ ] Add recipe rating and feedback system

### Shopping List Enhancements
- [ ] Implement ingredient grouping by category
- [ ] Add price comparison between stores
- [ ] Create shopping list sharing with family
- [ ] Implement cross-device sync (if backend enabled)
- [ ] Add barcode scanning for quick checkout

---

## Phase 4: Testing, Deployment & Polish

### Testing
- [ ] Unit tests for LLM integration
- [ ] Integration tests for camera and GPS features
- [ ] End-to-end testing of all user flows
- [ ] Performance testing (app launch, meal identification, chat response)
- [ ] Accessibility testing (VoiceOver, text scaling, color contrast)
- [ ] User acceptance testing (beta testers)

### UI/UX Polish
- [ ] Add animations and transitions (subtle, not distracting)
- [ ] Implement haptic feedback for all interactions
- [ ] Refine loading states and empty states
- [ ] Optimize images and assets for mobile
- [ ] Test on multiple device sizes and orientations

### Deployment
- [ ] Build for iOS (TestFlight)
- [ ] Build for Android (Google Play Console)
- [ ] Set up app store listings (screenshots, description, keywords)
- [ ] Configure push notifications (if needed)
- [ ] Set up analytics and crash reporting
- [ ] Create user documentation and FAQs

### Post-Launch
- [ ] Monitor app performance and crash reports
- [ ] Gather user feedback and iterate
- [ ] Plan Phase 2 enhancements (social sharing, community, etc.)

---

## Known Issues & Blockers
- [ ] None at initialization

---

## Notes
- React Native with Expo is the chosen framework for cross-platform iOS/Android development
- LLM integration uses OpenAI/Gemini APIs (configured in environment variables)
- GPS features require user permission and may have privacy implications
- Video analysis is computationally intensive; consider offline LLM for real-time coaching
- Shopping list GPS alerts should be configurable (users can disable location tracking)

---

**Last Updated:** January 1, 2026
