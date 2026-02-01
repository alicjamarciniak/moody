import { Pressable, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import colors from 'tailwindcss/colors';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      className="w-14 h-8 rounded-full bg-neutral-300 dark:bg-neutral-700 px-1 justify-center"
    >
      <View
        className={`
          w-6 h-6 rounded-full items-center justify-center
          bg-white dark:bg-neutral-900
          ${isDark ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        <FontAwesome
          name={isDark ? 'moon-o' : 'sun-o'}
          size={14}
          color={colors.amber[400]}
        />
      </View>
    </Pressable>
  );
}
