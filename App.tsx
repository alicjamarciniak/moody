import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MoodProvider } from './src/context/MoodContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { ThemeWrapper } from './src/theme/ThemeWrapper';
import { MainTabs } from './src/navigation/MainTabs';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
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
            </Stack.Navigator>
          </NavigationContainer>
        </MoodProvider>
      </ThemeWrapper>
    </ThemeProvider>
  );
}
