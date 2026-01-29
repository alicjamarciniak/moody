import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import { Text } from '../components/Text';
import { MOOD_KEYS, MOODS } from '../types/mood';
import { RootStackParamList } from '../types/navigation';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useBackgroundColorAnimation } from '../hooks/useBackgroundColorAnimation';
import { darkTheme, lightTheme } from '@/theme/theme';
import { saveMood } from '../services/moodService';

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
  const { t } = useTranslation();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [bgColor, setBgColor] = useState<string>('okay');

  const animatedStyle = useBackgroundColorAnimation({
    mood: bgColor,
    colorMap,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (selectedMood === null) return;

    setIsSaving(true);
    try {
      const mood = MOODS[selectedMood];
      console.log('Saving mood...', mood);
      const savePromise = saveMood('temp-user-id', {
        value: mood.value,
        label: mood.label,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
      });

      // Add timeout to detect hanging
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error('Save timeout - check Firestore setup')),
          10000
        )
      );

      await Promise.race([savePromise, timeoutPromise]);
      console.log('Mood saved, navigating...');
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

  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle]}>
      <SafeAreaView className="flex-1">
        <StatusBar style="light" />

        {/* Language Switcher */}
        <View className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </View>

        <View className="flex-1 items-center justify-center px-4">
          <Text className="text-xl text-dark dark:text-light mb-10 text-center">
            {t('welcome.title')}
          </Text>

          <View className="w-full gap-2 flex-row flex-wrap justify-center">
            {MOODS.map((_, i) => i)
              .filter((i) => i % 3 === 0)
              .map((i) => (
                <View key={i} className="flex-row gap-2">
                  {/* slice into rows with max 3 items */}
                  {MOODS.slice(i, i + 3).map((mood) => (
                    <TouchableOpacity
                      key={mood.value}
                      className={`flex-row items-center px-4 py-2 rounded-full border-2
                 ${
                   selectedMood === mood.value
                     ? 'bg-primary-dark dark:bg-primary border-transparent'
                     : 'border-primary-dark dark:border-primary'
                 }`}
                      onPress={() => {
                        setSelectedMood(mood.value);
                        setBgColor(mood.color);
                      }}
                    >
                      <Text
                        weight="medium"
                        className={`text-xs
                  ${
                    selectedMood === mood.value
                      ? 'text-light dark:text-dark '
                      : 'text-dark dark:text-light'
                  }`}
                      >
                        {t(`moods.${mood.label}`)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </View>
        </View>

        <View className="flex-row px-8 pb-10 gap-3">
          <TouchableOpacity
            className="flex-1 bg-transparent border-2 border-dark dark:border-light py-4 rounded-xl items-center"
            onPress={handleSkip}
          >
            <Text
              weight="bold"
              className="text-base font-bold text-dark dark:text-light"
            >
              {t('common.skip')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-4 rounded-xl items-center
            bg-primary-dark disabled:bg-primary-dark/50
            dark:bg-primary dark:disabled:bg-primary/50`}
            onPress={handleSave}
            disabled={selectedMood === null || isSaving}
          >
            <Text
              weight="bold"
              className="text-base font-bold text-light dark:text-dark"
            >
              {t('common.save')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}
