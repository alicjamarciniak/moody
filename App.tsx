import './global.css';
import './src/lib/i18n/config';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Roboto_300Light,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import { MoodProvider } from './src/context/MoodContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeWrapper } from './src/theme/ThemeWrapper';
import { MainTabs } from './src/navigation/MainTabs';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';
import MoodDetailsScreen from './src/screens/MoodDetailsScreen';
import OversightScreen from './src/screens/OversightScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <ActivityIndicator size="large" color="#f472b6" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {user === null ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="Note" component={NoteScreen} />
            <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
            <Stack.Screen name="MoodDetails" component={MoodDetailsScreen} />
            <Stack.Screen name="Oversight" component={OversightScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_300Light,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <View />;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <LanguageProvider>
          <ThemeWrapper>
            <MoodProvider>
              <RootNavigator />
            </MoodProvider>
          </ThemeWrapper>
        </LanguageProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
