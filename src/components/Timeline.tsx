import { View, ScrollView } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, darkTheme, MoodKey } from '../theme/theme';
import { MoodEntry } from '../types/mood';
import { getMostFrequentMood } from '../hooks/useMoods';
import { colors } from '@/theme/colors';

const WEEKDAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

interface TimelineProps {
  /** Total number of day circles to show */
  days: number;
  /** Mood entries to map onto the timeline */
  moods: MoodEntry[];
  /** How many future (greyed-out) days to show at the end */
  futureDays?: number;
  /** Most frequent mood label for today (from useMoods hook) */
  todayMood?: string | null;
}

export function Timeline({ days, moods, futureDays = 2, todayMood }: TimelineProps) {
  const { isDark } = useTheme();
  const theme = isDark ? darkTheme : lightTheme;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Group moods by date key
  const moodsByDate: Record<string, MoodEntry[]> = {};
  for (const mood of moods) {
    const key = mood.date;
    if (!moodsByDate[key]) moodsByDate[key] = [];
    moodsByDate[key].push(mood);
  }

  // Build day items: (days - futureDays) past/today days + futureDays future days
  const pastDays = days - futureDays;
  const items: { date: Date; isFuture: boolean }[] = [];

  for (let i = pastDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    items.push({ date: d, isFuture: false });
  }

  for (let i = 1; i <= futureDays; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    items.push({ date: d, isFuture: true });
  }

  const greyColor = isDark ? colors.midGray : colors.lightGray;
  const todayBorderColor = isDark ? colors.dirtyWhite : colors.darkGray;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 4, gap: 8, alignItems: 'flex-end' }}
    >
      {items.map((item) => {
        const dateKey = toDateKey(item.date);
        const dayOfMonth = item.date.getDate();
        const weekdayLetter = WEEKDAY_LETTERS[item.date.getDay()];
        const isToday = dateKey === toDateKey(today);

        const entriesForDay = moodsByDate[dateKey];
        const hasMood = !item.isFuture && entriesForDay && entriesForDay.length > 0;
        const moodLabel = hasMood ? getMostFrequentMood(entriesForDay) : null;
        const todayMoodColor = todayMood ? theme[todayMood as MoodKey] ?? theme.okay : null;
        const circleColor = moodLabel
          ? theme[moodLabel as MoodKey] ?? theme.okay
          : isToday && todayMoodColor
            ? todayMoodColor
            : greyColor;

        return (
          <View key={dateKey} className="items-center w-9">
            {/* Weekday letter */}
            <Text
              className={`text-xs mb-1 ${
                item.isFuture
                  ? 'text-lightGray dark:text-midGray'
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {weekdayLetter}
            </Text>

            {/* Circle */}
            <View
              className="w-9 h-9 rounded-full items-center justify-center"
              style={{
                backgroundColor: circleColor,
                borderWidth: isToday ? 2 : 0,
                borderColor: isToday ? todayBorderColor : 'transparent',
                opacity: item.isFuture ? 0.4 : 1,
              }}
            >
              <Text
                weight="medium"
                className={`text-xs ${
                  item.isFuture
                    ? 'text-lightGray dark:text-midGray'
                    : hasMood
                      ? 'text-darkGray dark:text-dirtyWhite'
                      : 'text-midGray dark:text-lightGray'
                }`}
              >
                {dayOfMonth}
              </Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
