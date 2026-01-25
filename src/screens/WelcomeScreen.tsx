import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MOODS } from '../types/mood';
import { RootStackParamList } from '../types/navigation';
import { useTheme } from '../context/ThemeContext';

type WelcomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const handleSave = () => {
    if (selectedMood !== null) {
      // TODO: Save mood to context/storage
      navigation.navigate('Main');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Main');
  };

  return (
    <SafeAreaView className="flex-1 bg-primary  dark:bg-primary-dark">
      <StatusBar style="light" />

      <View className="flex-1 items-center justify-center px-8">
        <Text className="text-3xl font-bold text-dark dark:text-light mb-10 text-center">
          How are you feeling today?
        </Text>

        <View className="w-full gap-4">
          {MOODS.map((mood) => (
            <TouchableOpacity
              key={mood.value}
              className={`flex-row items-center p-5 rounded-2xl border-2
                 ${
                   selectedMood === mood.value
                     ? 'bg-primary-dark dark:bg-primary border-none'
                     : 'border-primary-dark dark:border-primary'
                 }`}
              onPress={() => setSelectedMood(mood.value)}
            >
              {/* <Text className="text-4xl mr-4">{mood.emoji}</Text> */}
              <Text
                className={`text-xl font-semibold dark:text-dark text-light 
                  ${
                    selectedMood === mood.value
                      ? 'text-light dark:text-dark '
                      : 'text-dark dark:text-light'
                  }`}
              >
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="flex-row px-8 pb-10 gap-3">
        <TouchableOpacity
          className="flex-1 bg-transparent border-2 border-dark dark:border-light py-4 rounded-xl items-center"
          onPress={handleSkip}
        >
          <Text className="text-base font-bold text-dark dark:text-light">
            Skip
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-4 rounded-xl items-center 
            bg-primary-dark disabled:bg-primary-dark/50
            dark:bg-primary dark:disabled:bg-primary/50`}
          onPress={handleSave}
          disabled={selectedMood === null}
        >
          <Text className="text-base font-bold text-light dark:text-dark ">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
