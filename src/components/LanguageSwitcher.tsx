import { Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <View className="flex-row gap-2">
      <TouchableOpacity
        onPress={() => setLanguage('en')}
        className={`px-4 py-2 rounded-lg ${
          language === 'en'
            ? 'bg-primary dark:bg-primary-dark'
            : 'bg-light/20 dark:bg-dark/20'
        }`}
      >
        <Text
          className={`font-semibold ${
            language === 'en' ? 'text-dark dark:text-light' : 'text-dark/50 dark:text-light/50'
          }`}
        >
          EN
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setLanguage('pl')}
        className={`px-4 py-2 rounded-lg ${
          language === 'pl'
            ? 'bg-primary dark:bg-primary-dark'
            : 'bg-light/20 dark:bg-dark/20'
        }`}
      >
        <Text
          className={`font-semibold ${
            language === 'pl' ? 'text-dark dark:text-light' : 'text-dark/50 dark:text-light/50'
          }`}
        >
          PL
        </Text>
      </TouchableOpacity>
    </View>
  );
}
