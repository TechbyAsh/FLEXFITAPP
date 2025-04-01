                                    FLEX Technical Documentation

Architecture Overview

The FLEX app is built using:
-React Native with Expo
-TypeScript
-Expo Router for navigation
-Context API for state management

Screen Architecture:

Onboarding Flow
Location: app/onboarding/

Intro screens with app features overview
Goal setting interface for personalization
User preferences collection
Smooth transitions using Linear Gradient
Authentication Screens
Location: app/signup.tsx, app/login.tsx

Custom form validation
Social authentication integration
Secure password handling
Error state management
Password visibility toggle

Main Tab Navigation
Location: app/(tabs)/\_layout.tsx

1. Dashboard Screen (app/(tabs)/index.tsx)
   Features:
   Daily workout overview
   Fitness challenges carousel
   Progress highlights
   Quick action buttons
   Activity feed Components:
   Challenge cards with gradient backgrounds
   Progress indicators
   Custom workout tiles

2. Analytics Screen (app/(tabs)/analytics.tsx)
   Features:
   Workout statistics
   Progress photo gallery
   Goal tracking
   Journal entries Components:
   Custom charts and graphs
   Photo grid with management
   Progress indicators
   Journal entry system

3. Profile Screen (app/(tabs)/profile.tsx)
   Features:

User settings management
Preference controls
Account information
Support access Sections:
Account management
App preferences
Notification settings
Support resources

Core Components
Theme System
Location: context/ThemeContext.tsx

*Provides consistent styling across the app
*Includes color schemes, typography, and gradients
\*Accessible via useTheme hook

Navigation Structure
*Tab-based main navigation
*Stack navigation for modals
*Deep linking support
*Screen transitions

State Management
*React Context for global state
*Local state with useState
\*AsyncStorage for persistence

Image Handling
Implementation:

*Uses Expo Image Picker
*Progress photos stored locally
*Image compression and caching
*Secure storage implementation

UI Components
Common Elements:
*Custom buttons with gradients
*Form inputs with validation
*Loading states
*Error boundaries

Performance Optimizations
Lazy Loading

*Component lazy loading
*Image lazy loading
\*Route-based code splitting

Caching
*Image caching
*API response caching
\*Session storage

Memory Management
*Image optimization
*Resource cleanup
\*Background task handling

Testing Infrastructure
*Unit Testing
*Jest configuration
*Component testing
*Utility function tests

Integration Testing
*Navigation testing
*State management testing
\*API integration tests

Security Features
*Authentication
*Token-based auth
*Secure storage
*Session management

Data Protection
*Local encryption
*Secure API calls
\*Privacy controls

Error Handling

Global Error Boundary
*Graceful degradation
*Error reporting
\*Recovery mechanisms

Network Error Handling
*Offline support
*Retry mechanisms
\*User feedback

Build Process

Development
*Hot reloading
*Debug configuration
\*Development tools

Production
*Asset optimization
*Code minification
\*Performance monitoring
