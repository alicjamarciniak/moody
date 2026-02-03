import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { saveNote } from '../services/noteService';
import { colors } from '@/theme/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function NoteScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsSaving(true);
    try {
      const now = new Date();
      const trimmedTitle = title.trim();
      await saveNote(user!.uid, {
        ...(trimmedTitle ? { title: trimmedTitle } : {}),
        text: trimmed,
        date: toDateKey(now),
        timestamp: now.getTime(),
      });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save note:', error);
      Alert.alert(t('common.error'), t('common.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const placeholderColor = isDark ? '#6b7280' : '#9ca3af';

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="px-5 pt-4 pb-2 flex-row justify-between items-center">
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('note.title')}
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <FontAwesomeIcon
            icon={faXmark as IconProp}
            size={22}
            color={isDark ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>
      </View>

      {/* Text Input */}
      <View className="flex-1 px-5 pt-2">
        <View className="flex-1 p-5 rounded-2xl bg-white dark:bg-gray-800">
          <TextInput
            autoFocus
            placeholder={t('note.titlePlaceholder')}
            placeholderTextColor={placeholderColor}
            value={title}
            onChangeText={setTitle}
            style={{
              color: textColor,
              fontSize: 20,
              fontFamily: 'Roboto_700Bold',
              marginBottom: 12,
            }}
          />
          <TextInput
            multiline
            placeholder={t('note.placeholder')}
            placeholderTextColor={placeholderColor}
            value={text}
            onChangeText={setText}
            style={{
              flex: 1,
              color: textColor,
              fontSize: 16,
              textAlignVertical: 'top',
              fontFamily: 'Roboto_300Light',
            }}
          />
        </View>
      </View>

      {/* Save Button */}
      <View className="px-5 py-4">
        <Button
          text={t('note.save')}
          darkColor={colors.dirtyWhite}
          darkTextColor={colors.darkGray}
          size="lg"
          onPress={handleSave}
          disabled={!text.trim() || isSaving}
          style={{ opacity: !text.trim() || isSaving ? 0.5 : 1 }}
        />
      </View>
    </ScreenWrapper>
  );
}
