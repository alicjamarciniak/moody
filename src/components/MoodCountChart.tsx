import { View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';
import { MoodEntry } from '../types/mood';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, MoodKey } from '../theme/theme';
import { colors } from '@/theme/colors';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

const moodOrder: MoodKey[] = ['awesome', 'good', 'okay', 'bad', 'awful'];

interface MoodCountChartProps {
  moods: MoodEntry[];
  year: number;
  month: number;
}

export function MoodCountChart({ moods, year, month }: MoodCountChartProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  // Filter moods by selected year and month
  const filteredMoods = moods.filter((mood) => {
    const moodDate = new Date(mood.timestamp);
    return moodDate.getFullYear() === year && moodDate.getMonth() === month;
  });

  // Count moods by type
  const moodCounts = filteredMoods.reduce(
    (acc, mood) => {
      const key = mood.label as MoodKey;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<MoodKey, number>
  );

  const totalMoods = filteredMoods.length;

  // Calculate statistics
  // 1. Top mood
  const topMood = moodOrder.reduce((top, key) => {
    if (!moodCounts[key]) return top;
    if (!top || moodCounts[key] > moodCounts[top]) return key;
    return top;
  }, '' as MoodKey);

  // 2. Top daytime (morning, afternoon, evening, night)
  const daytimeCounts = filteredMoods.reduce((acc, mood) => {
    const hour = new Date(mood.timestamp).getHours();
    let period: string;
    if (hour >= 5 && hour < 12) period = 'morning';
    else if (hour >= 12 && hour < 17) period = 'afternoon';
    else if (hour >= 17 && hour < 21) period = 'evening';
    else period = 'night';
    acc[period] = (acc[period] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topDaytime = Object.entries(daytimeCounts).reduce(
    (top, [period, count]) => {
      if (!top[0] || count > top[1]) return [period, count];
      return top;
    },
    ['', 0] as [string, number]
  )[0];

  // 3. Mood streak (consecutive days with moods)
  const daysWithMoods = new Set(
    filteredMoods.map((mood) => {
      const date = new Date(mood.timestamp);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );
  const moodStreak = daysWithMoods.size;

  // 4. Average moods per day
  const avgMoodsPerDay = moodStreak > 0 ? (totalMoods / moodStreak).toFixed(1) : '0';

  // Prepare data for pie chart
  const pieData = moodOrder
    .filter((key) => moodCounts[key] > 0)
    .map((key) => ({
      value: moodCounts[key],
      color: lightTheme[key],
      text: '',
    }));

  if (totalMoods === 0) {
    return null;
  }

  return (
    <View className="p-6 rounded-2xl bg-white dark:bg-gray-800">
      <Text
        weight="bold"
        className="text-sm text-gray-600 dark:text-gray-400 mb-4"
      >
        {t('home.moodCount')}
      </Text>

      {totalMoods === 0 ? (
        <View className="items-center py-8">
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            {t('home.noMoods')}
          </Text>
        </View>
      ) : (
        <>
          {/* Donut Chart */}
          <View className="items-center mb-6">
            <PieChart
              data={pieData}
              donut
              radius={56}
              innerRadius={40}
              innerCircleColor={isDark ? colors.darkGray : '#ffffff'}
              centerLabelComponent={() => (
                <View className="items-center justify-center">
                  <Text
                    weight="bold"
                    className="text-3xl text-darkGray dark:text-dirtyWhite"
                  >
                    {totalMoods}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* Mood counts with icons */}
          <View className="flex-row justify-between items-center">
            {moodOrder.map((key) => {
              const count = moodCounts[key] || 0;
              const icon = moodIcons[key];
              const color = lightTheme[key];

              return (
                <View key={key} className="items-center">
                  {/* Circle with count badge */}
                  <View className="relative mb-2">
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{ backgroundColor: color + '33' }}
                    >
                      <FontAwesomeIcon icon={icon} size={24} color={color} />
                    </View>
                    {/* Count badge */}
                    {count > 0 && (
                      <View
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full items-center justify-center"
                        style={{ backgroundColor: color }}
                      >
                        <Text weight="bold" className="text-xs text-white">
                          {count}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
