import { View, TouchableOpacity } from 'react-native';
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
import { Text } from '../Text';
import { MoodEntry } from '../../types/mood';
import { useTheme } from '../../context/ThemeContext';
import { lightTheme, MoodKey } from '../../theme/theme';
import {
  gateDateStr,
  getDayTimeIcon,
  getTimeStr,
  getWeekdayKey,
  isToday,
  isYesterday,
} from '@/helpers/date';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

interface MoodCardProps {
  mood: MoodEntry;
  variant?: 'sm' | 'lg';
  onPress?: () => void;
}

export function MoodCard({ mood, variant = 'lg', onPress }: MoodCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const date = new Date(mood.timestamp);
  const timeStr = getTimeStr(date);
  const dayTimeIcon = getDayTimeIcon(date.getHours());
  const weekday = getWeekdayKey(date.getDay());

  const today = isToday(date);
  const yesterday = isYesterday(date);
  const dateStr = today ? '' : yesterday ? 'Yesterday' : gateDateStr(date);

  const theme = lightTheme;
  const moodColor = theme[mood.label as MoodKey] ?? theme.okay;
  const icon = moodIcons[mood.label] ?? moodIcons.okay;
  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const isSmall = variant === 'sm';

  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.7}
      className={`${isSmall ? 'pl-7 pr-4 py-3' : 'pl-9 pr-6 py-6'} rounded-2xl mb-3 flex-row items-center gap-3 overflow-hidden bg-white dark:bg-gray-800`}
    >
      {/* Color strip */}
      <View
        className="absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl"
        style={{ backgroundColor: moodColor }}
      />
      {/* Content */}
      <View className="flex-1 gap-1">
        <Text weight="bold" className={isSmall ? 'text-base' : 'text-xl'} style={{ color: textColor }}>
          {t(`moods.${mood.label}`)}
        </Text>

        <View className="flex-row items-center gap-1.5 mt-1">
          <FontAwesomeIcon icon={dayTimeIcon} size={isSmall ? 8 : 10} color={textColor} />
          <Text className={`${isSmall ? 'text-xs' : 'text-sm'} mr-4`} style={{ color: textColor }}>
            {timeStr}
          </Text>
          {!(today || yesterday) && (
            <Text className={isSmall ? 'text-xs' : 'text-sm'} style={{ color: textColor }}>
              {t(`time.days.${weekday}`)},
            </Text>
          )}
          <Text className={isSmall ? 'text-xs' : 'text-sm'} style={{ color: textColor }}>
            {dateStr}
          </Text>
        </View>
      </View>

      {/* Mood icon */}
      <View
        className={`${isSmall ? 'w-10 h-10' : 'w-16 h-16'} rounded-full items-center justify-center`}
        style={{ backgroundColor: moodColor + '4D' }}
      >
        <FontAwesomeIcon icon={icon} size={isSmall ? 22 : 35} color={moodColor} />
      </View>
    </Wrapper>
  );
}
