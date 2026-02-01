import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../components/Text';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types/navigation';
import {
  gateDateStr,
  getDayTimeIcon,
  getTimeStr,
  getWeekdayKey,
} from '@/helpers/date';

export default function NoteDetailsScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'NoteDetails'>>();
  const { note } = route.params;

  const date = new Date(note.timestamp);
  const timeStr = getTimeStr(date);
  const dayTimeIcon = getDayTimeIcon(date.getHours());
  const weekday = getWeekdayKey(date.getDay());
  const dateStr = gateDateStr(date);

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const subTextColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />

      {/* Header */}
      <View className="px-5 pt-4 pb-2 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size={20}
            color={isDark ? '#d1d5db' : '#4b5563'}
          />
        </TouchableOpacity>
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('noteDetails.title')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-2">
        <View className="p-6 rounded-2xl bg-white dark:bg-gray-800">
          {/* Title */}
          {note.title ? (
            <Text weight="bold" className="text-xl mb-3" style={{ color: textColor }}>
              {note.title}
            </Text>
          ) : null}

          {/* Date info */}
          <View className="flex-row items-center gap-1.5 mb-4">
            <FontAwesomeIcon icon={dayTimeIcon} size={12} color={subTextColor} />
            <Text className="text-sm" style={{ color: subTextColor }}>
              {timeStr}
            </Text>
            <Text className="text-sm" style={{ color: subTextColor }}>
              {t(`time.days.${weekday}`)},
            </Text>
            <Text className="text-sm" style={{ color: subTextColor }}>
              {dateStr}
            </Text>
          </View>

          {/* Note text */}
          <Text className="text-base leading-6" style={{ color: textColor }}>
            {note.text}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
