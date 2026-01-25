import React, { createContext, useState, useContext, ReactNode } from 'react';
import { MoodEntry } from '../types/mood';

interface MoodContextType {
  moods: MoodEntry[];
  addMood: (moodEntry: MoodEntry) => void;
  getMoodsByDate: (date: string) => MoodEntry[];
  getAllMoods: () => MoodEntry[];
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

interface MoodProviderProps {
  children: ReactNode;
}

export function MoodProvider({ children }: MoodProviderProps) {
  const [moods, setMoods] = useState<MoodEntry[]>([]);

  const addMood = (moodEntry: MoodEntry) => {
    setMoods(prev => [moodEntry, ...prev]);
  };

  const getMoodsByDate = (date: string): MoodEntry[] => {
    return moods.filter(mood => mood.date === date);
  };

  const getAllMoods = (): MoodEntry[] => {
    return moods;
  };

  const value: MoodContextType = {
    moods,
    addMood,
    getMoodsByDate,
    getAllMoods,
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMoodContext(): MoodContextType {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoodContext must be used within a MoodProvider');
  }
  return context;
}
