# Phase 2: Design System Overhaul & Polish

**Status:** IN PROGRESS  
**Date Started:** January 3, 2026  
**Objective:** Transform app with smooth animations, refined interactions, and professional polish

---

## 1. Design System Foundation ✅ COMPLETE

### Color Palette
- **Primary**: Terracotta (#D4773B) - Warm, appetizing, food-friendly
- **Secondary**: Sage Green (#4A7C3F) - Fresh, natural, ingredient-focused  
- **Accent**: Coral (#E85D3C) - Energetic, warm, inviting
- **Background**: Warm whites/browns (#FAFAF8 light, #1C1917 dark)
- **Surface**: White (#FFFFFF light, #2C2927 dark)
- **Foreground**: Dark brown (#2B2826 light, #F5F3F0 dark)
- **Status Colors**: Green (success), Orange (warning), Red (error)

**File:** `theme.config.js` ✅ Configured

### Typography
- **Headlines:** SF Pro Display / Roboto Bold - 28-32px
- **Body:** SF Pro Text / Roboto Regular - 16-18px  
- **Captions:** SF Pro Text / Roboto Regular - 12-14px

**Implementation:** Via Tailwind CSS with NativeWind

---

## 2. Animation System (Phase 2 Priority #1)

### Framework
- **Library:** React Native Animated API + Reanimated v3 (lightweight)
- **Pattern:** Shared transitions, spring physics, gesture-driven animations

### Micro-Interactions to Implement

#### A. Screen Transitions
- [x] Recipe Detail → Fade in from bottom with scale
- [x] Saved Recipes → Slide from right
- [x] Meal History → Slide from right
- [ ] Settings → Slide from right
- [ ] About → Slide from right
- [ ] Modal opens → Zoom in + fade
- [ ] Modal closes → Zoom out + fade

#### B. Button Interactions  
- [ ] Press → Slight scale (0.95), opacity fade
- [ ] Release → Spring bounce back (0.98→1.0)
- [ ] Loading → Spinner with rotation animation
- [ ] Success → Green checkmark with scale animation
- [ ] Error → Shake animation with red color

#### C. List Animations
- [ ] Items → Stagger fade-in (each item 50ms delay)
- [ ] Pull to refresh → Rotate spinner icon
- [ ] Empty state → Fade in with bounce
- [ ] Favorite toggle → Heart fill animation
- [ ] Swipe actions → Reveal delete button with spring

#### D. Form Interactions
- [ ] Input focus → Border color change + light shadow
- [ ] Input error → Shake + red text
- [ ] Toggle switch → Animated thumb movement
- [ ] Slider → Visual feedback on drag

#### E. Navigation
- [ ] Tab switch → Smooth fade between screens
- [ ] Back button → Pop animation (slightly right, fade out)
- [ ] Forward navigation → Slide from right

---

## 3. Loading States & Skeleton Screens (Phase 2 Priority #2)

### Current State
- Using ActivityIndicator (basic spinner)
- No skeleton loaders
- No placeholder content

### To Implement
- [ ] Create `SkeletonLoader` component
  - Animated gradient shimmer effect
  - Matches content shape (card, list item, text)
  - Auto-sizing based on content

- [ ] Recipe Detail Screen
  - Skeleton: Image box (full width), 3 text lines, button

- [ ] Saved Recipes Screen
  - Skeleton: 3 recipe cards with shimmer

- [ ] Meal History Screen  
  - Skeleton: Stats card, 3 meal entries with shimmer

- [ ] Chat Screen
  - Skeleton: Message bubbles alternating left/right

- [ ] Profile Screen
  - Skeleton: Avatar, 3 stat boxes, menu items

### Shimmer Effect
- Gray background: #E8E6E3 (light), #3D3A37 (dark)
- Shimmer gradient: Left-to-right white sweep (10% opacity)
- Duration: 1.5 seconds, loop infinitely

---

## 4. Empty States & Error States (Phase 2 Priority #3)

### Empty States to Create

#### Saved Recipes (Empty)
- 🍽️ Illustration
- "No Saved Recipes Yet"
- "Start saving your favorite meals to build your personal cookbook"
- CTA: "Browse Recipes" button

#### Meal History (Empty)
- 📊 Illustration
- "No Meals Tracked Yet"
- "Identify meals with your camera to track nutrition"
- CTA: "Open Camera" button

#### Chat (No Messages)
- 🤖 Illustration
- "Hi! I'm your AI Chef"
- "Ask me anything about cooking, nutrition, or recipes"
- Suggestion: Show 3-4 quick prompt examples

#### Favorites (No Favorites)
- ❤️ Illustration
- "No Favorites Yet"
- "Tap the heart icon on recipes to save your favorites"
- CTA: "Explore Recipes" button

### Error States
- **Network Error**: Icon + "Connection Lost" + Retry button
- **Load Error**: Icon + Error message + "Try Again" button
- **Permission Denied**: Icon + Permission message + "Open Settings" button

### Visual Treatment
- Emoji or simple icon (48-64px)
- Descriptive text (16px, centered)
- Subtitle text (14px, muted, centered)
- CTA button or suggestion pills
- Padding: 40px horizontal, 60px vertical

---

## 5. Haptic Feedback (Phase 2 Priority #4)

### Framework
- **Library:** `react-native-haptic-feedback`
- **Methods:** Light, Medium, Heavy, Success, Warning, Error

### Interaction Triggers

#### Light Haptic (Subtle feedback)
- [ ] Input focus
- [ ] Tab selection
- [ ] Swipe actions appear
- [ ] Dropdown opens

#### Medium Haptic (Normal feedback)
- [ ] Button press
- [ ] Item selection (favorite, journey)
- [ ] Toggle switch
- [ ] Slider adjustment

#### Heavy Haptic (Strong feedback)
- [ ] Save recipe
- [ ] Complete meal log
- [ ] Delete action
- [ ] Critical error

#### Success Haptic
- [ ] Recipe saved successfully
- [ ] Settings updated
- [ ] Form submitted
- [ ] Meal identified

#### Warning Haptic
- [ ] Permission denied
- [ ] Form validation error
- [ ] Delete confirmation

#### Error Haptic  
- [ ] Network error
- [ ] API error
- [ ] Invalid input

---

## 6. Component Refinement (Phase 2 Priority #5)

### Button Component
- [x] Add press animation (scale 0.95)
- [ ] Add spring bounce effect
- [ ] Add loading state (spinner + disabled)
- [ ] Add disabled state (opacity 0.5)
- [ ] Add icon support
- [ ] Add size variants (sm, md, lg)

### Card Component
- [x] Current: Basic container with border + padding
- [ ] Add elevation (shadow on light mode)
- [ ] Add press state (slight scale + shadow increase)
- [ ] Add interactive variant (with pointer feedback)

### Input Component
- [x] Current: Basic text input
- [ ] Add focus animation (border color + glow)
- [ ] Add error state (red border + shake animation)
- [ ] Add placeholder animation (float label on focus)
- [ ] Add clear button (X icon with fade-in)

### Badge Component
- [ ] Add dismiss animation (fade + scale out)
- [ ] Add icon support
- [ ] Add color variants (linked to status colors)

### New Components Needed
- [ ] **Skeleton** - Animated placeholder
- [ ] **Toast/Snackbar** - Brief notifications
- [ ] **Modal** - Overlay dialog
- [ ] **Spinner** - Custom animated loader
- [ ] **Slider** - Range input with visual feedback
- [ ] **Divider** - Subtle line separator

---

## 7. Screen-by-Screen Polish

### Home / Discovery Screen
- [ ] Hero section animation (fade-in on load)
- [ ] "Surprise Me" button: scale animation on press
- [ ] Recent meals: stagger fade-in animation
- [ ] Pull to refresh: spinner animation
- [ ] Skeleton loaders while fetching

### Camera Screen
- [ ] Capture button: pulse animation (breathing effect)
- [ ] Capture flash: white overlay + fade out
- [ ] Identify meal: spinner → checkmark animation
- [ ] Meal suggestions: slide up animation

### AI Chef Chat
- [ ] Message bubbles: stagger fade-in
- [ ] Typing indicator: animated dots
- [ ] User message: slide in from right
- [ ] AI message: slide in from left
- [ ] Input field: focus animation
- [ ] Skeleton loaders for AI responses

### Meal Plans / Meals
- [ ] Calendar dates: scale animation on tap
- [ ] Meal cards: image fade-in
- [ ] Stats cards: number counting animation (0 → value)
- [ ] Add meal button: plus icon rotation

### Tracks / Journey Selection
- [ ] Journey cards: scale on tap
- [ ] Progress ring: animate fill percentage
- [ ] Stats: number animation on load

### Shopping List
- [ ] Item checkoff: strikethrough + fade animation
- [ ] Location alert: slide in from top
- [ ] Add item: slide up from bottom
- [ ] Delete item: slide out + fade

### Profile & Settings
- [ ] Avatar: circular crop + shadow
- [ ] Stat boxes: number animation (0 → value)
- [ ] Menu items: highlight on press
- [ ] Settings toggles: smooth switch animation

### Recipe Detail
- [ ] Image: fade in + parallax scroll effect
- [ ] Content: fade in from bottom (staggered)
- [ ] Ingredients list: stagger animation
- [ ] Instructions: numbered list with stagger
- [ ] Save button: success animation on save
- [ ] Share button: scale animation

### Saved Recipes
- [ ] Header: fade in + slide
- [ ] Recipe cards: stagger fade-in
- [ ] Filter toggle: smooth transition
- [ ] Favorite heart: fill animation
- [ ] Skeleton loaders: animated shimmer

### Meal History  
- [ ] Stats card: number animation on load
- [ ] Date filter buttons: scale on press
- [ ] Meal entries: stagger fade-in
- [ ] Timeline view: vertical line animation
- [ ] Skeleton loaders: animated shimmer

---

## 8. Testing & QA Checklist

### Performance
- [ ] 60 FPS animations on iPhone 12+
- [ ] 30 FPS minimum on iPhone 8
- [ ] No memory leaks in reusable animations
- [ ] Smooth screen transitions
- [ ] Loading states appear within 200ms

### Accessibility
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Touch targets >= 48px
- [ ] Color contrast >= 4.5:1
- [ ] VoiceOver announcements for state changes
- [ ] Text scaling support (SF Text scaling)

### Cross-Platform
- [ ] iOS: All animations smooth
- [ ] Android: All animations smooth  
- [ ] Dark mode: Colors properly applied
- [ ] Light mode: Colors properly applied

### Devices
- [ ] iPhone 12 Pro Max (test high-end)
- [ ] iPhone 8 Plus (test mid-range)
- [ ] iPhone SE (test budget/small screen)
- [ ] Android flagship (Pixel 7+)
- [ ] Android mid-range (Pixel 4a)

---

## 9. Implementation Phases

### Week 1: Foundation
1. [x] Review Phase 1 completion
2. [x] Sync with GitHub repo
3. [ ] Set up Reanimated v3 if needed
4. [ ] Create Skeleton component
5. [ ] Add spring animation utilities

### Week 2: Core Animations
1. [ ] Button micro-interactions
2. [ ] Screen transitions (iOS-style)
3. [ ] List item stagger animations
4. [ ] Pull-to-refresh animation
5. [ ] Test on simulator

### Week 3: Loading & Empty States
1. [ ] Implement skeleton loaders
2. [ ] Add to all screens (recipe detail, saved recipes, history, etc.)
3. [ ] Design empty state illustrations
4. [ ] Implement empty state screens
5. [ ] Test loading states

### Week 4: Haptic & Polish
1. [ ] Integrate haptic feedback library
2. [ ] Add haptic triggers to key interactions
3. [ ] Refine component animations
4. [ ] Test accessibility features
5. [ ] Final QA & bug fixes

---

## 10. Success Criteria

- ✅ All screens have smooth animations (60 FPS)
- ✅ Loading states show skeleton loaders (not spinners)
- ✅ Empty states have contextual messaging + CTAs
- ✅ Haptic feedback on key interactions
- ✅ Accessibility: respects motion preferences, good contrast
- ✅ Dark/Light mode fully implemented
- ✅ Tested on simulator and real devices
- ✅ Ready for Phase 3: Multimodal & Spatial features

---

## 11. Resources & Dependencies

### Key Libraries
- `react-native-reanimated@3` - Advanced animations
- `react-native-gesture-handler@2` - Gesture handling
- `react-native-haptic-feedback@2` - Haptic effects
- `expo-image` - Image loading with placeholders
- `date-fns@4.1.0` - Date/time formatting (already installed)

### Design References
- Apple HIG (Human Interface Guidelines) - iOS animations
- Material Design 3 - Android animations  
- Dribbble food app designs - Inspiration

### Installation
```bash
pnpm add react-native-reanimated react-native-gesture-handler react-native-haptic-feedback
```

---

## Git Strategy
- **Branch:** `phase-2-design-polish`
- **Commit Pattern:** Feature-based (e.g., `feat: add animation to recipe detail screen`)
- **Review:** Check animations on simulator before committing
- **Merge:** To main after all 4 weeks complete and QA passed

---

**Next Action:** Start Week 1 by setting up animation utilities and creating the Skeleton component.
