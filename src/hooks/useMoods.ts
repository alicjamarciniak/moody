import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserMoods } from '../services/moodService';
import { MoodEntry } from '../types/mood';

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

  return { moods, isLoading, refetch: fetchMoods };
}
