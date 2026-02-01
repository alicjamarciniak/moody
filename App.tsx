import './global.css';
import './src/lib/i18n/config';
import { View } from 'react-native';
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
import { ThemeWrapper } from './src/theme/ThemeWrapper';
import { MainTabs } from './src/navigation/MainTabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';
import MoodDetailsScreen from './src/screens/MoodDetailsScreen';
import OversightScreen from './src/screens/OversightScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
    <ThemeProvider>
      <LanguageProvider>
        <ThemeWrapper>
          <MoodProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="Note" component={NoteScreen} />
                <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
                <Stack.Screen name="MoodDetails" component={MoodDetailsScreen} />
                <Stack.Screen name="Oversight" component={OversightScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </MoodProvider>
        </ThemeWrapper>
      </LanguageProvider>
    </ThemeProvider>
  );
}
