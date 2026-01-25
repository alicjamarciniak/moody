import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Language Switcher */}
      <View className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </View>

      <View className="flex-1 items-center justify-center p-5">
        <Text
          className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2"
          style={{ fontFamily: 'Roboto_700Bold' }}
        >
          {t('home.title')}
        </Text>
        <Text
          className="text-base text-gray-600 dark:text-gray-400 mb-8"
          style={{ fontFamily: 'Roboto_400Regular' }}
        >
          {t('home.subtitle')}
        </Text>

        <TouchableOpacity onPress={toggleTheme} className="bg-primary px-6 py-3 rounded-xl">
          <Text
            className="text-white font-semibold"
            style={{ fontFamily: 'Roboto_500Medium' }}
          >
            {t('home.switchTheme', { mode: t(isDark ? 'home.light' : 'home.dark') })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
