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

const POSITIVE_MOODS = ['awesome', 'good', 'okay'];

function getMostFrequentMoodLast30Days(moods: MoodEntry[]): string | null {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const recent = moods.filter((m) => m.timestamp >= thirtyDaysAgo);
  if (recent.length === 0) return null;

  const counts: Record<string, number> = {};
  for (const entry of recent) {
    counts[entry.label] = (counts[entry.label] || 0) + 1;
  }

  let maxCount = 0;
  let maxLabel = recent[0].label;
  for (const [label, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      maxLabel = label;
    }
  }
  return maxLabel;
}

interface MoodSummaryWidgetProps {
  moods: MoodEntry[];
}

export function MoodSummaryWidget({ moods }: MoodSummaryWidgetProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const topMood = getMostFrequentMoodLast30Days(moods);
  if (!topMood) return null;

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
          color="#ffffff80"
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
      </View>
    </View>
  );
}
