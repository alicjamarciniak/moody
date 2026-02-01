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

  // Prepare data for pie chart
  const pieData = moodOrder
    .filter((key) => moodCounts[key] > 0)
    .map((key) => ({
      value: moodCounts[key],
      color: lightTheme[key],
      text: '',
    }));

  const textColor = isDark ? '#f3f4f6' : '#1f2937';

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
              radius={70}
              innerRadius={50}
              innerCircleColor={isDark ? '#1f2937' : '#ffffff'}
              centerLabelComponent={() => (
                <View className="items-center justify-center">
                  <Text
                    weight="bold"
                    className="text-4xl"
                    style={{ color: textColor }}
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
