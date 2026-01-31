import { useState, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserMoods } from '../services/moodService';
import { MoodEntry } from '../types/mood';

/**
 * Returns the most frequent mood label from an array of entries.
 * On a tie, picks the mood that was recorded most recently (highest timestamp).
 * Returns null if the array is empty.
 */
export function getMostFrequentMood(entries: MoodEntry[]): string | null {
  if (entries.length === 0) return null;

  const counts: Record<string, number> = {};
  const latestTimestamp: Record<string, number> = {};

  for (const entry of entries) {
    counts[entry.label] = (counts[entry.label] || 0) + 1;
    if (!latestTimestamp[entry.label] || entry.timestamp > latestTimestamp[entry.label]) {
      latestTimestamp[entry.label] = entry.timestamp;
    }
  }

  let maxCount = 0;
  let maxTimestamp = 0;
  let maxLabel = entries[0].label;

  for (const [label, count] of Object.entries(counts)) {
    if (
      count > maxCount ||
      (count === maxCount && latestTimestamp[label] > maxTimestamp)
    ) {
      maxCount = count;
      maxTimestamp = latestTimestamp[label];
      maxLabel = label;
    }
  }

  return maxLabel;
}

function toDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function useMoods(userId: string = 'temp-user-id') {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMoods = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserMoods(userId);
      setMoods(data);
    } catch (error) {
      console.error('Failed to fetch moods:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchMoods();
    }, [fetchMoods])
  );

  const todayMood = useMemo(() => {
    const todayKey = toDateKey(new Date());
    const todayEntries = moods.filter((m) => m.date === todayKey);
    return getMostFrequentMood(todayEntries);
  }, [moods]);

  const recentMood = useMemo(() => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recent = moods.filter((m) => m.timestamp >= thirtyDaysAgo);
    return getMostFrequentMood(recent);
  }, [moods]);

  return { moods, isLoading, refetch: fetchMoods, todayMood, recentMood };
}
