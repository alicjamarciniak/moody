import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
  faSun,
  faMoon,
  faCloudSun,
  faFire,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';
import { MoodEntry } from '../types/mood';
import { lightTheme, MoodKey } from '../theme/theme';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

const daytimeIcons: Record<string, IconProp> = {
  morning: faSun as IconProp,
  afternoon: faCloudSun as IconProp,
  evening: faSun as IconProp,
  night: faMoon as IconProp,
};

const moodOrder: MoodKey[] = ['awesome', 'good', 'okay', 'bad', 'awful'];

interface StatisticsBlocksProps {
  moods: MoodEntry[];
  year: number;
  month: number;
}

export function StatisticsBlocks({
  moods,
  year,
  month,
}: StatisticsBlocksProps) {
  const { t } = useTranslation();
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

  // Calculate statistics
  // 1. Top mood
  const topMood = moodOrder.reduce((top, key) => {
    if (!moodCounts[key]) return top;
    if (!top || moodCounts[key] > moodCounts[top]) return key;
    return top;
  }, '' as MoodKey);

  // 2. Top daytime (morning, afternoon, evening, night)
  const daytimeCounts = filteredMoods.reduce(
    (acc, mood) => {
      const hour = new Date(mood.timestamp).getHours();
      let period: string;
      if (hour >= 5 && hour < 12) period = 'morning';
      else if (hour >= 12 && hour < 17) period = 'afternoon';
      else if (hour >= 17 && hour < 21) period = 'evening';
      else period = 'night';
      acc[period] = (acc[period] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topDaytime = Object.entries(daytimeCounts).reduce(
    (top, [period, count]) => {
      if (!top[0] || count > top[1]) return [period, count];
      return top;
    },
    ['', 0] as [string, number]
  )[0];

  // 3. Active days (days with at least one mood)
  const daysWithMoods = new Set(
    filteredMoods.map((mood) => {
      const date = new Date(mood.timestamp);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );
  const activeDays = daysWithMoods.size;

  // 4. Mood streak (consecutive days with moods)
  const sortedDays = Array.from(daysWithMoods)
    .map((dateStr) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m, d).getTime();
    })
    .sort((a, b) => a - b);

  let longestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDays.length; i++) {
    const dayDiff = (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
    if (dayDiff === 1) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  const statistics = [
    {
      icon: topMood ? moodIcons[topMood] : faFaceSmile,
      iconColor: topMood ? lightTheme[topMood] : lightTheme.okay,
      label: t('oversight.topMood'),
      value: topMood ? t(`moods.${topMood}`) : '-',
    },
    {
      icon: topDaytime ? daytimeIcons[topDaytime] : faSun,
      iconColor: '#f59e0b',
      label: t('oversight.topDaytime'),
      value: topDaytime ? t(`oversight.daytime.${topDaytime}`) : '-',
    },
    {
      icon: faCalendarDays as IconProp,
      iconColor: '#10b981',
      label: t('oversight.activeDays'),
      value: activeDays.toString(),
    },
    {
      icon: faFire as IconProp,
      iconColor: '#ef4444',
      label: t('oversight.longestStreak'),
      value:
        longestStreak > 0 ? `${longestStreak} ${t('oversight.days')}` : '-',
    },
  ];

  return (
    <View className="flex-row flex-wrap gap-2">
      {statistics.map((stat, index) => (
        <View
          key={index}
          className="flex-1 min-w-[45%] px-3 py-3 rounded-xl flex-row bg-white dark:bg-darkGray"
        >
          <View
            className="w-10 h-10 rounded-full items-center justify-center mr-2"
            style={{ backgroundColor: stat.iconColor + '20' }}
          >
            <FontAwesomeIcon
              icon={stat.icon as IconProp}
              size={20}
              color={stat.iconColor}
            />
          </View>
          <View className="flex-col items-center mb-1.5 flex-1">
            <Text className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {stat.label}
            </Text>
            <Text
              weight="bold"
              className="text-mf text-center text-darkGray dark:text-dirtyWhite"
            >
              {stat.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
