import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import EntriesList from '@/components/EntriesList';
import { useMoods } from '@/hooks/useMoods';
import { useNotes } from '@/hooks/useNotes';

export default function EntriesScreen() {
  const { isDark } = useTheme();
  const { moods, isLoading: moodsLoading } = useMoods();
  const { notes, isLoading: notesLoading } = useNotes();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View className="flex-1 pt-5 pb-10">
        <EntriesList moods={moods} notes={notes} isLoading={moodsLoading || notesLoading} />
      </View>
    </SafeAreaView>
  );
}
