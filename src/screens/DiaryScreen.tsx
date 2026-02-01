import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { InProgressBanner } from '../components/InProgressBanner';
import { useTheme } from '../context/ThemeContext';

export default function DiaryScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="px-5 pt-4 pb-2">
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('insights.title')}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {t('insights.subtitle')}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center p-5">
        <InProgressBanner />
      </View>
    </SafeAreaView>
  );
}
