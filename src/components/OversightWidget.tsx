import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from './Text';
import { RootStackParamList } from '../types/navigation';

export function OversightWidget() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Oversight')}
      className="p-6 rounded-2xl bg-bubblegum/80 dark:bg-gray-800 flex-row items-center justify-center gap-5 flex-1"
      activeOpacity={0.7}
    >
      <Ionicons name="analytics-outline" size={40} color="white" />
      <Text
        weight="bold"
        className="text-lg text-center text-white dark:text-gray-500"
      >
        {t('oversight.widget')}
      </Text>
    </TouchableOpacity>
  );
}
