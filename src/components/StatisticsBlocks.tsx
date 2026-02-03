import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFaceSmile,
  faSun,
  faFire,
  faCalendarDays,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';
import { MoodEntry } from '../types/mood';
import { lightTheme } from '@/theme/theme';
import { moodIcons } from '@/constants/moodIcons';
import { daytimeIcons } from '@/constants/daytimeIcons';
import { useStatistics } from '@/hooks/useStatistics';

interface StatisticItem {
  icon: IconProp;
  iconColor: string;
  label: string;
  value: string;
}

function Item({ stat }: { stat: StatisticItem }) {
  return (
    <View className="flex-1 min-w-[45%] px-3 py-3 rounded-xl flex-row bg-white dark:bg-darkGray">
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
  );
}

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
  const { topMood, topDaytime, activeDays, longestStreak } = useStatistics(
    moods,
    year,
    month
  );

  const statistics: StatisticItem[] = [
    {
      icon: topMood ? (moodIcons[topMood] as IconProp) : (faFaceSmile as IconProp),
      iconColor: topMood ? lightTheme[topMood as keyof typeof lightTheme] : lightTheme.okay,
      label: t('oversight.topMood'),
      value: topMood ? t(`moods.${topMood}`) : '-',
    },
    {
      icon: topDaytime ? (daytimeIcons[topDaytime] as IconProp) : (faSun as IconProp),
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
        <Item key={index} stat={stat} />
      ))}
    </View>
  );
}
