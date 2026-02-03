import { StatusBar } from 'expo-status-bar';
import { View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { MOOD_KEYS, MoodOption, MOODS } from '../../types/mood';
import { RootStackParamList } from '../../types/navigation';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { MoodAnimation } from '../../components/MoodAnimation';
import { useBackgroundColorAnimation } from '../../hooks/useBackgroundColorAnimation';
import { darkTheme, lightTheme } from '@/theme/theme';
import { saveMood } from '../../services/moodService';
import { useAuth } from '../../context/AuthContext';
import MoodPill from './MoodPill';

function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const colorMap: Record<string, { light: string; dark: string }> =
  MOOD_KEYS.reduce(
    (acc, key) => {
      acc[key] = { light: lightTheme[key], dark: darkTheme[key] };
      return acc;
    },
    {} as Record<string, { light: string; dark: string }>
  );

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(2);
  const [bgColor, setBgColor] = useState<string>('okay');
  const [isSaving, setIsSaving] = useState(false);

  const animatedStyle = useBackgroundColorAnimation({
    mood: bgColor,
    colorMap,
  });

  const handleSave = async () => {
    if (selectedMood === null) return;

    setIsSaving(true);
    try {
      const mood = MOODS[selectedMood];
      await saveMood(user!.uid, {
        value: mood.value,
        label: mood.label,
        date: toDateKey(new Date()),
        timestamp: Date.now(),
      });

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Failed to save mood:', error);
      Alert.alert(t('common.error'), t('common.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Main');
  };

  const onMoodSelect = (mood: MoodOption) => {
    setSelectedMood(mood.value);
    setBgColor(mood.color);
  };

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <View
        style={{
          flex: 1,
          marginTop: Math.max(insets.top, 16),
          marginBottom: Math.max(insets.bottom, 16),
        }}
      >
        <StatusBar style="light" />

        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-xl text-dark dark:text-light mb-6 text-center">
            {t('welcome.title')}
          </Text>

          {selectedMood !== null && (
            <View style={{ height: 150, overflow: 'hidden', marginBottom: 50 }}>
              <MoodAnimation mood={MOOD_KEYS[selectedMood]} size={300} />
            </View>
          )}

          <View className="w-full gap-2 flex-row flex-wrap justify-center">
            {MOODS.map((_, i) => i)
              .filter((i) => i % 3 === 0)
              .map((i) => (
                <View key={i} className="flex-row gap-2">
                  {/* slice into rows with max 3 items */}
                  {MOODS.slice(i, i + 3).map((mood) => (
                    <MoodPill
                      key={mood.value}
                      mood={mood}
                      onMoodSelect={onMoodSelect}
                      isSelected={selectedMood === mood.value}
                    />
                  ))}
                </View>
              ))}
          </View>
        </View>

        <View className="flex-row px-8 pb-10 gap-3">
          <Button
            variant="outlined"
            size="lg"
            text={t('common.skip')}
            onPress={handleSkip}
            className="flex-1"
          />

          <Button
            variant="solid"
            size="lg"
            text={t('common.save')}
            onPress={handleSave}
            disabled={selectedMood === null || isSaving}
            className="flex-1"
          />
        </View>
      </View>
    </Animated.View>
  );
}
