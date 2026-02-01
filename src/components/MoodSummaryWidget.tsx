import { View } from 'react-native';
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
import { useTheme } from '../context/ThemeContext';
import { lightTheme, MoodKey } from '../theme/theme';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

const POSITIVE_MOODS = ['awesome', 'good', 'okay'];

interface MoodSummaryWidgetProps {
  recentMood: string | null;
}

export function MoodSummaryWidget({ recentMood }: MoodSummaryWidgetProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  if (!recentMood) return null;
  const topMood = recentMood;

  const theme = lightTheme;
  const moodColor = theme[topMood as MoodKey] ?? theme.okay;
  const icon = moodIcons[topMood] ?? moodIcons.okay;
  const isPositive = POSITIVE_MOODS.includes(topMood);
  const textColor = isDark ? '#f3f4f6' : '#1f2937';

  return (
    <View
      className="p-6 rounded-2xl flex-row items-center gap-3 overflow-hidden flex-1"
      style={{ backgroundColor: `${moodColor}90` }}
    >
      <View className="flex gap-2 z-10">
        <View className="gap-[0.5]">
          <Text weight="bold" className="text-sm" style={{ color: textColor }}>
            {t('home.summaryTitle', { mood: t(`moods.${topMood}`) })}
          </Text>
          <Text
            weight="bold"
            className="text-xl uppercase"
            style={{ color: textColor }}
          >
            {t(`moods.${topMood}`)}
          </Text>
        </View>

        <Text className="text-sm text-wrap" style={{ color: textColor }}>
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
