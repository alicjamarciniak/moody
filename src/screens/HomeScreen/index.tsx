import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { Text } from '../../components/Text';
import { useTheme } from '../../context/ThemeContext';
import MoodList from '@/components/Mood/MoodList';
import { Timeline } from '@/components/Timeline';
import { useMoods } from '@/hooks/useMoods';
import { MoodSummaryWidget } from '@/components/MoodSummaryWidget';
import { NoteWidget } from '@/components/NoteWidget';
import Header from './Header';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { moods, isLoading, todayMood, recentMood } = useMoods();

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Header />

      {/* Timeline Card */}
      <View className="mx-5 mb-3 p-6 rounded-2xl bg-white dark:bg-gray-800">
        <Text
          weight="bold"
          className="text-sm text-gray-600 dark:text-gray-400 mb-3"
        >
          {t('home.timeline')}
        </Text>
        <Timeline days={7} moods={moods} futureDays={2} todayMood={todayMood} />
      </View>

      {/* Mood Summary Widget + Note Widget */}
      <View className="mx-5 mb-3 flex-row gap-3 h-36">
        <View className="flex-[1]">
          <NoteWidget />
        </View>
        <View className="flex-[2]">
          <MoodSummaryWidget recentMood={recentMood} />
        </View>
      </View>

      <View className="flex-1">
        <MoodList moods={moods} isLoading={isLoading} />
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
