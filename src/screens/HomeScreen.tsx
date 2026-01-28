import { View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text } from '../components/Text';
import { useTheme } from '../context/ThemeContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { getUserMoods } from '../services/moodService';
import { MoodEntry } from '../types/mood';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const renderMoodItem = ({ item }: { item: MoodEntry }) => (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-3 flex-row justify-between items-center">
      <View>
        <Text weight="medium" className="text-lg text-gray-800 dark:text-gray-100">
          {t(`moods.${item.label}`)}
        </Text>
        <Text className="text-sm text-gray-500 dark:text-gray-400">
          {item.date}
        </Text>
      </View>
      {item.note && (
        <Text className="text-sm text-gray-600 dark:text-gray-300 flex-1 ml-4">
          {item.note}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View className="px-5 pt-4 pb-2 flex-row justify-between items-center">
        <View>
          <Text weight="bold" className="text-2xl text-gray-800 dark:text-gray-100">
            {t('home.title')}
          </Text>
          <Text className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.subtitle')}
          </Text>
        </View>
        <LanguageSwitcher />
      </View>

      {/* Mood List */}
      <View className="flex-1 px-5">
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
          <FlatList
            data={moods}
            keyExtractor={(item) => item.id}
            renderItem={renderMoodItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
        )}
      </View>

      {/* Theme Toggle */}
      <View className="px-5 pb-4">
        <TouchableOpacity onPress={toggleTheme} className="bg-primary py-3 rounded-xl items-center">
          <Text weight="medium" className="text-white font-semibold">
            {t('home.switchTheme', { mode: t(isDark ? 'home.light' : 'home.dark') })}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
