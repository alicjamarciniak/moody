import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';

export function NoteWidget() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const iconColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Note')}
      className="p-6 rounded-2xl bg-white dark:bg-gray-800 flex-row items-center gap-3"
      activeOpacity={0.7}
    >
      <FontAwesomeIcon icon={faPenToSquare} size={18} color={iconColor} />
      <Text className="text-base text-gray-400 dark:text-gray-500">
        {t('note.widget')}
      </Text>
    </TouchableOpacity>
  );
}
