# Moody

A modern mood tracking mobile application that helps you monitor and understand your emotional well-being over time. Moody combines a beautiful, intuitive interface with powerful analytics to help you identify patterns in your moods, maintain a personal diary, and gain insights into your mental health journey.


<div align="center">
  
|   |   |   |   |
|---|---|---|---|
| ![hippo](https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnBsbmQ1eHkxdzk5NnJlcHpidXJ0cjF1NmVxcDBrZzh6dGkyd2FkNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EZhUN4SRtTH4w7Yquv/giphy.gif)| <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770028443.png" width="200"/> | <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770166658.png" width="200"/> | <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770167141.png" width="200"/> | 

</div>


## Features

- 😄🫶 Mood Tracking: Check in with your vibes daily using fun, visual mood icons
- 📊🔥 Interactive Charts & Analytics: See your mood glow up with colorful charts and smart stats
- 🕰️🌀 Timeline View: Scroll your emotional lore in a clean, chronological feed
- 📈👀 Statistics Dashboard: Spot patterns, trends, and “oh wow” moments in your data
- 🔐💅 User Authentication: Secure sign-in, no stress — email or Google
- 🌙😴 Dark Mode: For night owls, doom-scrollers, and cozy vibes
- 🌍💬 Multi-language Support: English & Polish — because global energy
- 📶🫡 Offline-ready: No signal? No problem. Syncs when you’re back

### Planned for the future:

- ✍️🧠 Personal Diary: Brain-dump your thoughts, feelings, and random moments
- 🏷️✨ Tags System: Label your moods so future-you actually understands them

<div align="center">

|   |   |   |
|---|---|---|
| <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770167156.png" width="200"/> | <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770167367.png" width="200"/> | <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770167384.png" width="200"/> |

</div>


## Installation

### Android

Download and install the latest APK:

1. Download the APK file from: `[APK_LINK_TO_BE_ADDED]`
2. On your Android device, go to Settings > Security
3. Enable "Install from Unknown Sources" or "Allow from this source"
4. Open the downloaded APK file and follow the installation prompts
5. Launch Moody and start tracking your moods!

**Note**: iOS installation is not available yet.

<div align="center">

|  DARK MODE  |  IOS  |
|---|---|
| <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot_1770167779.png" width="300"/> | <img src="https://github.com/alicjamarciniak/moody/blob/screenshots/screenshots/Screenshot-ios.png" width="300"/> |

</div>

## Local Development

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI
- For iOS development: macOS with Xcode installed
- For Android development: Android Studio with Android SDK

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moody
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google Sign-In)
   - Enable Firestore Database
   - Add your Firebase configuration to the project

### Running in Test Mode

#### iOS (macOS only)

```bash
npm run ios
```

This will launch the app in the iOS Simulator.

#### Android

```bash
npm run android
```

This will launch the app in the Android Emulator or on a connected Android device.

#### Development Mode (Expo Go)

For quick testing without native builds:

```bash
npm start
```

Then scan the QR code with:
- **iOS**: Camera app (requires Expo Go app installed)
- **Android**: Expo Go app

## Core Technologies

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (~54) - React Native development platform
- **TypeScript** - Type-safe JavaScript
- **Firebase** - Backend services
  - Firebase Authentication - User authentication
  - Cloud Firestore - Real-time database
- **React Navigation** - Navigation library for routing and screen management
- **NativeWind** - Tailwind CSS for React Native
- **i18next** - Internationalization framework
- **React Native Gifted Charts** - Data visualization and charting
- **Lottie React Native** - Animation library
- **FontAwesome** - Icon library
- **React Native Reanimated** - Animations and gestures

## Scripts

```bash
npm start          # Start the Expo development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Lint the codebase
npm run lint:fix   # Fix linting issues
npm run format     # Format code with Prettier
npm run type-check # Run TypeScript type checking
```

## License

[License information to be added]

## Contributing

[Contributing guidelines to be added]
