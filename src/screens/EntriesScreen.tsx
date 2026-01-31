import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { useTheme } from '../context/ThemeContext';
import MoodList from '@/components/Mood/MoodList';
import { useMoods } from '@/hooks/useMoods';

export default function EntriesScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { moods, isLoading } = useMoods();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="flex-1 pt-5 pb-10">
        <MoodList moods={moods} isLoading={isLoading} />
      </View>
    </SafeAreaView>
  );
}
