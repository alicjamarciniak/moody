import { Text } from '@/components';
import { type MoodOption } from '@/types/mood';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  mood: MoodOption;
  onMoodSelect: (mood: MoodOption) => void;
  isSelected: boolean;
}

const MoodPill = ({ mood, onMoodSelect, isSelected }: Props) => {
  return (
    <TouchableOpacity
      key={mood.value}
      onPress={() => onMoodSelect(mood)}
      className={`flex-row items-center px-4 py-2 rounded-full border-2
        ${
          isSelected
            ? 'bg-primary-dark dark:bg-primary border-transparent'
            : 'border-primary-dark dark:border-primary'
        }`}
    >
      <Text
        weight="medium"
        className={`text-xs
          ${isSelected ? 'text-light dark:text-dark' : 'text-dark dark:text-light'}`}
      >
        {t(`moods.${mood.label}`)}
      </Text>
    </TouchableOpacity>
  );
};

export default MoodPill;
