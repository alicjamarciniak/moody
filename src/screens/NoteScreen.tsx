import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { saveNote } from '../services/noteService';

export default function NoteScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setIsSaving(true);
    try {
      const now = new Date();
      await saveNote('temp-user-id', {
        text: trimmed,
        date: now.toISOString().split('T')[0],
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
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

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
            icon={faXmark}
            size={22}
            color={isDark ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>
      </View>

      {/* Text Input */}
      <View className="flex-1 px-5 pt-2">
        <View className="flex-1 p-5 rounded-2xl bg-white dark:bg-gray-800">
          <TextInput
            multiline
            autoFocus
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
          size="lg"
          onPress={handleSave}
          disabled={!text.trim() || isSaving}
          style={{ opacity: !text.trim() || isSaving ? 0.5 : 1 }}
        />
      </View>
    </SafeAreaView>
  );
}
