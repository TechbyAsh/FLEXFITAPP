FLEX - Fitness Training App

A React Native mobile application built with Expo for personalized fitness training and tracking.

Features
Personalized Workouts: 6-week customized training plans
Progress Tracking: Track workouts, calories, and fitness goals
Journal Entries: Document progress with photos and notes
Analytics Dashboard: Visualize fitness progress and achievements
MyFitnessPal Integration: Track nutrition and calories
Profile Management: Customize preferences and settings

Tech Stack
React Native with Expo
TypeScript
Expo Router for navigation
Expo Linear Gradient for UI effects
Expo Image Picker for photo uploads
MyFitnessPal integration (planned)

Project Structure
├── app/ # Main application code
│ ├── (tabs)/ # Tab-based screens
│ ├── onboarding/ # Onboarding flow
│ └── \_layout.tsx # Root layout configuration
├── assets/ # Static assets (images, fonts)
├── context/ # React Context providers
└── components/ # Reusable components

Setup & Running
Install dependencies:
npm install
Start the development server:
npm start
Use Expo Go app to run on your device by scanning the QR code

Theme Configuration

The app uses a custom theme system defined in context/ThemeContext.tsx with:
Dark mode support
Custom color schemes
Typography system
Gradient presets

Navigation
Tab-based navigation for main screens
Stack navigation for onboarding and authentication
Deep linking support through Expo Router

Screens
-Dashboard: Home screen with workout overview
-Analytics: Progress tracking and statistics
-Profile: User settings and preferences
-Onboarding: Initial setup and goal setting

Development Guidelines
-Follow TypeScript types and interfaces
-Use theme context for styling
-Implement error boundaries for stability
-Follow Expo's best practices for performance

Planned Features
-Integration with fitness tracking devices
-Social features and community support
-Advanced analytics and reporting
-Nutrition tracking improvements

License
Copyright © 2024. All rights reserved.
