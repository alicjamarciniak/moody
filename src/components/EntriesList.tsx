import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MoodCard } from './Mood/MoodCard';
import { NoteCard } from './NoteCard';
import { MoodEntry } from '@/types/mood';
import { Note } from '@/types/note';
import { Text } from '@/components/Text';
import { RootStackParamList } from '@/types/navigation';
import { colors } from '@/theme/colors';
import ScrollMask from './ScrollMask';

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
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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
          <ActivityIndicator size="large" color={colors.bubblegum[400]} />
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
                <MoodCard
                  key={`mood-${item.data.id}`}
                  mood={item.data}
                  onPress={() =>
                    navigation.navigate('MoodDetails', { mood: item.data })
                  }
                />
              ) : (
                <NoteCard
                  key={`note-${item.data.id}`}
                  note={item.data}
                  onPress={() =>
                    navigation.navigate('NoteDetails', { note: item.data })
                  }
                />
              )
            )}
          </ScrollView>
          <ScrollMask />
        </>
      )}
    </View>
  );
};

export default EntriesList;
