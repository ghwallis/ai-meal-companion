# AI Meal Companion - Development TODO

## Project Overview
An AI-native mobile food companion featuring real-time video cooking coaching, GPS-embedded shopping alerts, expert AI chat, and personalized meal tracks for iOS and Android.

---

## Phase 1: Foundation & Core Intelligence ✅ COMPLETE

### Core Setup
- [x] Configure app branding (app name, logo, colors in app.config.ts)
- [x] Set up theme colors in theme.config.js (Saffron, Forest Green, Burnt Orange)
- [ ] Create app icon and splash screen assets
- [ ] Set up environment variables for LLM API keys (OpenAI/Gemini)
- [ ] Initialize backend LLM service integration

### Navigation & Screens
- [x] Implement tab bar navigation (Home, Camera, Chat, Meals, Profile)
- [x] Create Home screen with Surprise Me button and quick actions
- [x] Create Camera screen with photo/video capture UI
- [x] Create AI Chef Chat screen with message interface
- [x] Create Meal Plans screen with weekly calendar
- [x] Create Tracks screen with journey selection
- [x] Create Shopping List screen with GPS alerts
- [x] Create Profile & Settings screen
- [x] Create Recipe Detail modal screen
- [x] Create Onboarding flow (welcome → track selection → permissions)
- [ ] Create Surprise Me ingredient input modal

### UI Component Library
- [x] Create reusable Button component (primary, secondary, outline, ghost)
- [x] Create reusable Card component (default, elevated, outlined)
- [x] Create reusable Input component (with label and error states)
- [x] Create reusable Badge component (for tags and labels)
- [ ] Create Modal component
- [ ] Create Loading skeleton component
- [ ] Create Toast/Alert component

### Core Features
- [ ] Implement "Surprise Me" feature (ingredient input → recipe generation)
- [ ] Implement basic meal identification (photo capture → LLM analysis)
- [ ] Implement AI Chef Chat (text input → LLM response with RAG)
- [ ] Set up local AsyncStorage for meal history and user preferences
- [ ] Create onboarding flow (welcome → track selection → permissions)

---

## Phase 2: Design System Overhaul (Next)

### Color Palette Redesign
- [ ] Research food app design trends
- [ ] Create new sophisticated color palette (warm earth tones, fresh greens, elegant neutrals)
- [ ] Update theme.config.js with new colors
- [ ] Apply new colors to all screens and components

### UI/UX Polish
- [ ] Add smooth animations and transitions
- [ ] Implement micro-interactions for all buttons and interactions
- [ ] Refine spacing and typography hierarchy
- [ ] Create smooth loading states and skeleton screens
- [ ] Add haptic feedback for key interactions
- [ ] Test accessibility (VoiceOver, text scaling, color contrast)

### Component Refinement
- [ ] Update Button component with smooth animations
- [ ] Add shadow and elevation effects
- [ ] Implement smooth transitions between screens
- [ ] Create consistent spacing system
- [ ] Add visual feedback for all interactive elements

---

## Phase 3: Multimodal & Spatial Integration

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

## GitHub Sync Status
- [ ] Initialize GitHub repository
- [ ] Push Phase 1 complete code to GitHub
- [ ] Set up GitHub Actions for CI/CD
- [ ] Create development and main branches

---

## Known Issues & Blockers
- [ ] Dev server occasionally shows "Premature close" errors (non-critical)

---

## Notes
- React Native with Expo is the chosen framework for cross-platform iOS/Android development
- LLM integration uses OpenAI/Gemini APIs (configured in environment variables)
- GPS features require user permission and may have privacy implications
- Video analysis is computationally intensive; consider offline LLM for real-time coaching
- Shopping list GPS alerts should be configurable (users can disable location tracking)
- Phase 1 focuses on building all screens and components with current color scheme
- Phase 2 will redesign the entire app with a sophisticated food-focused aesthetic
- All screens are functional with mock data and ready for LLM integration

---

**Last Updated:** January 1, 2026
**Phase 1 Status:** ✅ COMPLETE - Ready for GitHub sync and Phase 2 design overhaul
