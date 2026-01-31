import { View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Text } from './Text';
import { Note } from '../types/note';
import { useTheme } from '../context/ThemeContext';
import {
  gateDateStr,
  getDayTimeIcon,
  getTimeStr,
  getWeekdayKey,
  isToday,
  isYesterday,
} from '@/helpers/date';
import { useTranslation } from 'react-i18next';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const date = new Date(note.timestamp);
  const timeStr = getTimeStr(date);
  const dayTimeIcon = getDayTimeIcon(date.getHours());
  const weekday = getWeekdayKey(date.getDay());

  const today = isToday(date);
  const yesterday = isYesterday(date);
  const dateStr = today ? '' : yesterday ? 'Yesterday' : gateDateStr(date);

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const noteColor = isDark ? '#60a5fa' : '#3b82f6';

  return (
    <View className="p-6 rounded-2xl mb-3 flex-row items-center gap-3 overflow-hidden bg-white dark:bg-gray-800">
      <View className="flex-1 gap-1">
        <Text weight="bold" className="text-xl" style={{ color: textColor }} numberOfLines={1} ellipsizeMode="tail">
          {note.title || note.text}
        </Text>

        <View className="flex-row items-center gap-1.5 mt-1">
          <FontAwesomeIcon icon={dayTimeIcon} size={10} color={textColor} />
          <Text className="text-sm mr-4" style={{ color: textColor }}>
            {timeStr}
          </Text>
          {!(today || yesterday) && (
            <Text className="text-sm" style={{ color: textColor }}>
              {t(`time.days.${weekday}`)},
            </Text>
          )}
          <Text className="text-sm" style={{ color: textColor }}>
            {dateStr}
          </Text>
        </View>
      </View>

      <View
        className="w-16 h-16 rounded-full items-center justify-center"
        style={{ backgroundColor: noteColor + '4D' }}
      >
        <FontAwesomeIcon icon={faNoteSticky as IconProp} size={28} color={noteColor} />
      </View>
    </View>
  );
}
