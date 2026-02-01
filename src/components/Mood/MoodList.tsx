import { LinearGradient } from 'expo-linear-gradient';
import { t } from 'i18next';
import React from 'react';
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MoodCard } from './MoodCard';
import { MoodEntry } from '@/types/mood';
import { Text } from '@/components/Text';
import { useColorScheme } from 'nativewind';
import { MainTabParamList } from '@/types/navigation';
import { colors } from '@/theme/colors';

interface MoodListProps {
  moods: MoodEntry[];
  isLoading: boolean;
  limit?: number;
}

const MoodList = ({ moods, isLoading, limit }: MoodListProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
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
          <ActivityIndicator size="large" color={colors.bubblegum[400]} />
        </View>
      ) : moods.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            {t('home.noMoods')}
          </Text>
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
        </View>
      )}
    </View>
  );
};

export default MoodList;
