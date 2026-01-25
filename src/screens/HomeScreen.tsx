import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="flex-1 items-center justify-center p-5">
        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Home</Text>
        <Text className="text-base text-gray-600 dark:text-gray-400 mb-8">Track your mood today</Text>

        <TouchableOpacity
          onPress={toggleTheme}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-semibold">
            Switch to {isDark ? 'Light' : 'Dark'} Mode
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
