import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, MoodKey } from '../theme/theme';
import { colors } from '@/theme/colors';
import { moodIcons } from '@/constants/moodIcons';

const POSITIVE_MOODS = ['awesome', 'good', 'okay'];

function EmptyWidget() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const grayIconColor = isDark ? colors.darkGray : colors.lightGray;

  return (
    <View className="p-6 rounded-2xl flex-row items-center gap-3 overflow-hidden flex-1 bg-gray-200 dark:bg-darkGray">
      <View className="flex gap-2 z-10">
        <Text
          weight="bold"
          className="text-sm text-midGray dark:text-lightGray"
        >
          {t('home.summaryTitle', { mood: '' })}
        </Text>
        <Text
          weight="bold"
          className="text-lg text-midGray dark:text-lightGray"
        >
          {t('home.noMoodYet')}
        </Text>
      </View>

      <View className="absolute right-[-34] top-0 bottom-0 items-end justify-center">
        <FontAwesomeIcon
          icon={faCircleQuestion as IconProp}
          size={140}
          color={grayIconColor}
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
      </View>
    </View>
  );
}

function MoodWidget({ topMood }: { topMood: string }) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const theme = lightTheme;
  const moodColor = theme[topMood as MoodKey] ?? theme.okay;
  const icon = moodIcons[topMood] ?? moodIcons.okay;
  const isPositive = POSITIVE_MOODS.includes(topMood);

  return (
    <View
      className="p-6 rounded-2xl flex-row items-center gap-3 overflow-hidden flex-1"
      style={{ backgroundColor: `${moodColor}90` }}
    >
      <View className="flex gap-2 z-10">
        <View className="gap-[0.5]">
          <Text
            weight="bold"
            className="text-sm text-darkGray dark:text-dirtyWhite"
          >
            {t('home.summaryTitle', { mood: t(`moods.${topMood}`) })}
          </Text>
          <Text
            weight="bold"
            className="text-xl uppercase text-darkGray dark:text-dirtyWhite"
          >
            {t(`moods.${topMood}`)}
          </Text>
        </View>

        <Text className="text-sm text-wrap text-darkGray dark:text-dirtyWhite">
          {isPositive
            ? t('home.summaryPositive')
            : t('home.summaryEncouraging')}
        </Text>
      </View>

      <View className="absolute right-[-34] top-0 bottom-0 items-end justify-center">
        <FontAwesomeIcon
          icon={icon}
          size={140}
          color={isDark ? `${moodColor}80` : moodColor}
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
      </View>
    </View>
  );
}

interface MoodSummaryWidgetProps {
  recentMood: string | null;
}

export function MoodSummaryWidget({ recentMood }: MoodSummaryWidgetProps) {
  return recentMood ? <MoodWidget topMood={recentMood} /> : <EmptyWidget />;
}
