import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getUserNotes } from '../services/noteService';
import { Note } from '../types/note';
import { useAuth } from '../context/AuthContext';

export function useNotes() {
  const { user } = useAuth();
  const userId = user!.uid;
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getUserNotes(userId);
      setNotes(data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes])
  );

  return { notes, isLoading, refetch: fetchNotes };
}
