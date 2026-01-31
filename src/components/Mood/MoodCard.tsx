import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
  faSun,
  faCloudSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text';
import { MoodEntry } from '../../types/mood';
import { useTheme } from '../../context/ThemeContext';
import { lightTheme, darkTheme, MoodKey } from '../../theme/theme';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

function getDayTime(hour: number): { key: string; icon: IconProp } {
  if (hour >= 5 && hour < 12) {
    return { key: 'morning', icon: faSun as IconProp };
  }
  if (hour >= 12 && hour < 18) {
    return { key: 'afternoon', icon: faCloudSun as IconProp };
  }
  return { key: 'evening', icon: faMoon as IconProp };
}

function getWeekdayKey(dayIndex: number): string {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return days[dayIndex];
}

interface MoodCardProps {
  mood: MoodEntry;
}

export function MoodCard({ mood }: MoodCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const date = new Date(mood.timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hour}:${minutes}`;
  const dayTime = getDayTime(hour);
  const weekday = getWeekdayKey(date.getDay());

  const dateStr = date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const theme = lightTheme;
  const moodColor = theme[mood.label as MoodKey] ?? theme.okay;
  const icon = moodIcons[mood.label] ?? moodIcons.okay;
  const textColor = isDark ? '#f3f4f6' : '#1f2937';

  return (
    <View
      className="p-5 rounded-2xl mb-3 flex-row items-center gap-3 overflow-hidden"
      style={{
        backgroundColor: `${moodColor}90`,
      }}
    >
      {/* Content */}
      <View className="flex-1">
        <Text weight="bold" className="text-lg" style={{ color: textColor }}>
          {t(`moods.${mood.label}`)}
        </Text>

        <View className="flex-row items-center gap-1.5 mt-1">
          <FontAwesomeIcon icon={dayTime.icon} size={10} color={textColor} />

          <Text className="text-sm " style={{ color: textColor }}>
            {timeStr}
          </Text>

          <Text className="text-sm" style={{ color: textColor }}>
            |
          </Text>

          <Text className="text-sm" style={{ color: textColor }}>
            {t(`time.days.${weekday}`)},
          </Text>
          <Text className="text-sm" style={{ color: textColor }}>
            {dateStr}
          </Text>
        </View>
      </View>

      {/* Mood icon */}
      <View className="w-20 h-12 rounded-full items-center justify-center">
        <FontAwesomeIcon
          icon={icon}
          size={120}
          color={'#ffffff60'}
          style={{ transform: [{ rotate: '-15deg' }] }}
        />
      </View>
    </View>
  );
}
