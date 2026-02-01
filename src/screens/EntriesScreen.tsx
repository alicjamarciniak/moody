import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { useTheme } from '../context/ThemeContext';
import EntriesList from '@/components/EntriesList';
import { useMoods } from '@/hooks/useMoods';
import { useNotes } from '@/hooks/useNotes';

export default function EntriesScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { moods, isLoading: moodsLoading } = useMoods();
  const { notes, isLoading: notesLoading } = useNotes();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="px-5 pt-4 pb-2">
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('entries.title')}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {t('entries.subtitle')}
        </Text>
      </View>
      <View className="flex-1 pb-10">
        <EntriesList moods={moods} notes={notes} isLoading={moodsLoading || notesLoading} />
      </View>
    </SafeAreaView>
  );
}
