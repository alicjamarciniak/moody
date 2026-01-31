import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import MoodList from '@/components/Mood/MoodList';
import Header from './Header';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Header />
      <View className="h-[300px]">
        <MoodList />
      </View>

      {/* Theme Toggle */}
      <View className="px-5 pb-4">
        <TouchableOpacity
          onPress={toggleTheme}
          className="bg-primary py-3 rounded-xl items-center mt-5"
        >
          <Text weight="medium" className="text-black font-semibold">
            {t('home.switchTheme', {
              mode: t(isDark ? 'home.light' : 'home.dark'),
            })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
