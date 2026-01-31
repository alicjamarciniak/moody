import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { MoodCard } from './Mood/MoodCard';
import { NoteCard } from './NoteCard';
import { MoodEntry } from '@/types/mood';
import { Note } from '@/types/note';
import { Text } from '@/components/Text';
import { useTheme } from '@/context/ThemeContext';

type EntryItem =
  | { type: 'mood'; data: MoodEntry }
  | { type: 'note'; data: Note };

interface EntriesListProps {
  moods: MoodEntry[];
  notes: Note[];
  isLoading: boolean;
}

const EntriesList = ({ moods, notes, isLoading }: EntriesListProps) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const entries = useMemo(() => {
    const items: EntryItem[] = [
      ...moods.map((m) => ({ type: 'mood' as const, data: m })),
      ...notes.map((n) => ({ type: 'note' as const, data: n })),
    ];
    items.sort((a, b) => b.data.timestamp - a.data.timestamp);
    return items;
  }, [moods, notes]);

  return (
    <View className="px-5 flex-1">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#10b981" />
        </View>
      ) : entries.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400 text-center">
            {t('entries.noEntries')}
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
          >
            {entries.map((item) =>
              item.type === 'mood' ? (
                <MoodCard key={`mood-${item.data.id}`} mood={item.data} />
              ) : (
                <NoteCard key={`note-${item.data.id}`} note={item.data} />
              )
            )}
          </ScrollView>
          {/* Top fade */}
          <LinearGradient
            colors={
              isDark ? ['#111827', '#11182700'] : ['#f3f4f6', '#f3f4f600']
            }
            className="absolute top-0 left-0 right-0 h-6 z-10"
            pointerEvents="none"
          />
          {/* Bottom fade */}
          <LinearGradient
            colors={
              isDark ? ['#11182700', '#111827'] : ['#f3f4f600', '#f3f4f6']
            }
            className="absolute bottom-0 left-0 right-0 h-6 z-10"
            pointerEvents="none"
          />
        </>
      )}
    </View>
  );
};

export default EntriesList;
