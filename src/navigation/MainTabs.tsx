import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MoodEntryScreen from '../screens/MoodEntryScreen';
import CalendarScreen from '../screens/CalendarScreen';
import InsightsScreen from '../screens/InsightsScreen';
import { MainTabParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#666',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Text className="text-xl">🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Mood Entry"
        component={MoodEntryScreen}
        options={{
          tabBarIcon: () => <Text className="text-xl">😊</Text>,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: () => <Text className="text-xl">📅</Text>,
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: () => <Text className="text-xl">📊</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
