import { t } from 'i18next';
import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MoodCard } from './MoodCard';
import { MoodEntry } from '@/types/mood';
import { Text } from '@/components/Text';
import { MainTabParamList } from '@/types/navigation';
import { colors } from '@/theme/colors';
import ScrollMask from '../ScrollMask';
import Spinner from '../Spinner';

interface MoodListProps {
  moods: MoodEntry[];
  isLoading: boolean;
  limit?: number;
}

const MoodList = ({ moods, isLoading, limit }: MoodListProps) => {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const displayedMoods = limit ? moods.slice(0, limit) : moods;
  const hasMore = limit ? moods.length > limit : false;

  return (
    <View className="px-5 flex-1 static">
      <Text
        weight="bold"
        className="text-lg text-gray-600 dark:text-gray-400 mb-2 static"
      >
        {t('home.moodHistory')}
      </Text>
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner />
        </View>
      ) : moods.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            {t('home.noMoods')}
          </Text>
        </View>
      ) : limit ? (
        <View className="py-2">
          {displayedMoods.map((item) => (
            <MoodCard key={item.id} mood={item} variant="sm" />
          ))}
          {hasMore && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Entries')}
              className="items-center py-2"
            >
              <Text weight="medium" className="text-bubblegum">
                {t('home.seeMore')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View className="flex-1 relative">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          >
            {displayedMoods.map((item) => (
              <MoodCard key={item.id} mood={item} variant="sm" />
            ))}
          </ScrollView>
          <ScrollMask />
        </View>
      )}
    </View>
  );
};

export default MoodList;
