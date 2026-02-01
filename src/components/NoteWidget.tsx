import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export function NoteWidget() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Note')}
      className="p-6 rounded-2xl bg-blue-300 dark:bg-blue-400 flex-col items-center justify-center gap-3 flex-1"
      activeOpacity={0.7}
    >
      <FontAwesomeIcon icon={faPlus as IconProp} size={30} color={'white'} />
      <Text
        weight="bold"
        className="text-sm text-center text-white"
      >
        {t('note.widget')}
      </Text>
    </TouchableOpacity>
  );
}
