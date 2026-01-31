import { LinearGradient } from 'expo-linear-gradient';
import { t } from 'i18next';
import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { MoodCard } from './MoodCard';
import { MoodEntry } from '@/types/mood';
import { Text } from '@/components/Text';
import { getUserMoods } from '@/services/moodService';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '@/context/ThemeContext';

const MoodList = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  const fetchMoods = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserMoods('temp-user-id');
      setMoods(data);
    } catch (error) {
      console.error('Failed to fetch moods:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMoods();
    }, [fetchMoods])
  );

  return (
    <View className="px-5 h-[300px]">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : moods.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            {t('home.noMoods')}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
          >
            {moods.map((item) => (
              <MoodCard key={item.id} mood={item} />
            ))}
          </ScrollView>
          {/* Top fade */}
          <LinearGradient
            colors={
              isDark ? ['#111827', '#11182700'] : ['#f3f4f6', '#f3f4f600']
            }
            className="absolute top-0 left-0 right-0 h-6 z-10"
            pointerEvents="none"
          />
          {/* Bottom fade */}
          <LinearGradient
            colors={
              isDark ? ['#11182700', '#111827'] : ['#f3f4f600', '#f3f4f6']
            }
            className="absolute bottom-0 left-0 right-0 h-6 z-10"
            pointerEvents="none"
          />
        </>
      )}
    </View>
  );
};

export default MoodList;
