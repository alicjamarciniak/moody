export const MOOD_KEYS = ['awful', 'bad', 'okay', 'good', 'awesome'] as const;

export interface MoodEntry {
  id: string;
  value: number;
  label: string;
  date: string;
  timestamp: number;
  note?: string;
}

export interface MoodOption {
  label: string;
  value: number;
  color: string;
}

export const MOODS: MoodOption[] = MOOD_KEYS.map((key, index) => ({
  label: key,
  value: index,
  color: key,
}));
