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
      className="p-6 rounded-2xl flex-row items-center gap-3 overflow-hidden"
      style={{ backgroundColor: `${moodColor}90` }}
    >
      <View className="flex-1 gap-1">
        <Text weight="bold" className="text-lg" style={{ color: textColor }}>
          {t('home.summaryTitle', { mood: t(`moods.${topMood}`) })}
        </Text>
        <Text className="text-sm" style={{ color: textColor }}>
          {isPositive
            ? t('home.summaryPositive')
            : t('home.summaryEncouraging')}
        </Text>
      </View>

      <View className="w-20 h-12 rounded-full items-center justify-center">
        <FontAwesomeIcon
          icon={icon}
          size={140}
          color={moodColor}
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
      </View>
    </View>
  );
}
