import { useState, useCallback } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
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
import { OversightWidget } from '@/components/OversightWidget';
import Header from './Header';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { moods, isLoading, refetch, todayMood, recentMood } = useMoods();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        {/* Oversight Widget */}
        <View className="mx-5 mb-3 h-24 flex">
          <OversightWidget />
        </View>

        {/* Mood List */}
        <MoodList moods={moods} isLoading={isLoading} limit={5} />
      </ScrollView>
    </SafeAreaView>
  );
}
