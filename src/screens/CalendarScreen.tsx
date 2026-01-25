import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function CalendarScreen() {
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Calendar</Text>
        <Text className="text-base text-gray-600 dark:text-gray-400">View your mood history</Text>
      </View>
    </SafeAreaView>
  );
}
