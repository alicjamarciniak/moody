import { useMemo } from 'react';
import { MoodEntry } from '../types/mood';
import { MoodKey } from '../theme/theme';

const moodOrder: MoodKey[] = ['awesome', 'good', 'okay', 'bad', 'awful'];

const filterMoodsByMonth = (
  moods: MoodEntry[],
  year: number,
  month: number
) => {
  return moods.filter((mood) => {
    const moodDate = new Date(mood.timestamp);
    return moodDate.getFullYear() === year && moodDate.getMonth() === month;
  });
};

const getTopMood = (filteredMoods: MoodEntry[]): MoodKey | null => {
  const moodCounts = filteredMoods.reduce(
    (acc, mood) => {
      const key = mood.label as MoodKey;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<MoodKey, number>
  );

  const top = moodOrder.reduce((best, key) => {
    if (!moodCounts[key]) return best;
    if (!best || moodCounts[key] > moodCounts[best]) return key;
    return best;
  }, '' as MoodKey);

  return top || null;
};

const getTopDaytime = (filteredMoods: MoodEntry[]): string | null => {
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

  const top = Object.entries(daytimeCounts).reduce(
    (best, [period, count]) => {
      if (!best[0] || count > best[1]) return [period, count];
      return best;
    },
    ['', 0] as [string, number]
  )[0];

  return top || null;
};

const getActiveDays = (filteredMoods: MoodEntry[]): number => {
  const daysWithMoods = new Set(
    filteredMoods.map((mood) => {
      const date = new Date(mood.timestamp);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );
  return daysWithMoods.size;
};

const getLongestStreak = (filteredMoods: MoodEntry[]): number => {
  const daysWithMoods = new Set(
    filteredMoods.map((mood) => {
      const date = new Date(mood.timestamp);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    })
  );

  const sortedDays = Array.from(daysWithMoods)
    .map((dateStr) => {
      const [y, m, d] = dateStr.split('-').map(Number);
      return new Date(y, m, d).getTime();
    })
    .sort((a, b) => a - b);

  let longestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < sortedDays.length; i++) {
    const dayDiff =
      (sortedDays[i] - sortedDays[i - 1]) / (1000 * 60 * 60 * 24);
    if (dayDiff === 1) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
    }
  }
  longestStreak = Math.max(longestStreak, currentStreak);

  return longestStreak;
};

interface Statistics {
  topMood: MoodKey | null;
  topDaytime: string | null;
  activeDays: number;
  longestStreak: number;
}

export function useStatistics(
  moods: MoodEntry[],
  year: number,
  month: number
): Statistics {
  return useMemo(() => {
    const filteredMoods = filterMoodsByMonth(moods, year, month);

    return {
      topMood: getTopMood(filteredMoods),
      topDaytime: getTopDaytime(filteredMoods),
      activeDays: getActiveDays(filteredMoods),
      longestStreak: getLongestStreak(filteredMoods),
    };
  }, [moods, year, month]);
}
