# Expo SDK 53 Upgrade & Troubleshooting Log

**Project:** FLEXFITAPP  
**Date of Resolution:** 2025-05-15

---

## Background

This log details the step-by-step process and decisions made to resolve breaking changes, runtime errors, and dependency issues after upgrading the FLEXFITAPP project to Expo SDK 53.

---

## Major Issues Encountered

1. **Hermes Runtime Error:**  
   `[runtime not ready]: ReferenceError: Property 'require' doesn't exist, js engine: hermes`
2. **Module Resolution Errors:**  
   - Unable to resolve `"../../context/ThemeContext"` from `app/(onboarding)/details.tsx`
   - Unable to resolve `"expo-linear-gradient"` from `app/(auth)/login.tsx`
3. **Font Registration Errors:**  
   - Font loading error: Registering 'Montserrat-Bold' font failed

---

## Troubleshooting Steps & Solutions

### 1. Update All Dependencies for Expo SDK 53 Compatibility

- Matched all core dependencies to the versions recommended by Expo CLI:
  - `react` to `19.0.0`
  - `react-dom` to `19.0.0`
  - `react-native` to `0.79.2`
  - `react-native-safe-area-context` to `5.4.0`
  - `@expo/metro-config` to `~0.20.0`
  - `@types/react` to `~19.0.10`
  - `jest-expo` to `~53.0.5`
- Updated all other Expo and React Native packages to their Expo 53-compatible versions.

### 2. Cleaned and Reinstalled All Node Modules

- Removed all caches and lockfiles:
  ```bash
  rm -rf node_modules package-lock.json yarn.lock
  rm -rf $TMPDIR/metro-*
  watchman watch-del-all
  npm cache clean --force
  npm install
  npx expo start -c


### 3. Removed Incompatible and Unnecessary Files
Deleted Replit-specific files:
.replit
replit.nix
Ensured no hidden config files (.babelrc, .metrorc, etc.) were present.
4. Isolated the Source of the Hermes Error
Moved all custom folders (components, context, services, etc.) out of the project.
Verified the error persisted with only minimal Expo code.
Confirmed the error was resolved only after updating all dependencies to match Expo SDK 53.
5. Gradually Restored Project Files
Restored each custom folder one at a time, restarting Expo after each restore.
Verified the app worked after each step, confirming no hidden code was causing the Hermes error.
6. Restored and Un-commented Core App Logic
Gradually uncommented and restored all previously commented-out code in app/index.tsx and other app files.
Verified onboarding logic, navigation, and Backendless integration were all functional.
7. Resolved Module Resolution Errors
Restored all previously moved folders (e.g., context/ for ThemeContext).
Installed any missing packages reported by Metro (e.g., expo-image-picker, expo-linear-gradient, backendless).
8. Addressed Font and Icon Warnings
Verified that font files exist in the correct directory and are loaded with the correct path.
Checked icon names for validity in react-native-vector-icons.
Best Practices Learned
Always update all core dependencies to the versions recommended by Expo CLI when upgrading Expo SDKs.
Remove any platform-specific or unrelated config files (e.g., Replit files) to avoid Metro and bundler confusion.
Isolate and restore custom code/folders step by step to quickly identify the source of persistent errors.
Thoroughly clean all caches and lockfiles when troubleshooting persistent runtime errors.
Install missing packages as soon as Metro reports them.
Outcome
Hermes runtime error resolved
All module resolution issues fixed
Project is now fully compatible with Expo SDK 53 and running smoothly
Future Recommendations
When upgrading Expo, always check the Expo SDK release notes for breaking changes and required dependency versions.
Use npx expo doctor and pay attention to CLI warnings about version mismatches.
Keep a troubleshooting log like this for future upgrades!