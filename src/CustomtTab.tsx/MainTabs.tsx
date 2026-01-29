import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHouse,
  faTag,
  faList,
  faBook,
} from '@fortawesome/free-solid-svg-icons';
import {
  WelcomeScreen,
  DiaryScreen,
  EntriesScreen,
  TagsScreen,
  HomeScreen,
} from '@/screens';
import { MainTabParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';
import { CustomTabBar } from './CustomTabBar';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  const { isDark } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: '#10b981',
        tabBarInactiveTintColor: isDark ? '#9ca3af' : '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faHouse as IconProp}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Entries"
        component={EntriesScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faList as IconProp}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Diary"
        component={DiaryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon
              icon={faBook as IconProp}
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tags"
        component={TagsScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faTag as IconProp} size={20} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
