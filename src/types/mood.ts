export interface MoodEntry {
  id: string;
  value: number;
  label: string;
  emoji: string;
  date: string;
  timestamp: number;
  note?: string;
}

export interface MoodOption {
  label: string;
  emoji: string;
  value: number;
}

export const MOODS: MoodOption[] = [
  { label: 'Awesome', emoji: '😄', value: 5 },
  { label: 'Great', emoji: '😊', value: 4 },
  { label: 'Okay', emoji: '😐', value: 3 },
  { label: 'Bad', emoji: '😞', value: 2 },
  { label: 'Awful', emoji: '😢', value: 1 },
];
