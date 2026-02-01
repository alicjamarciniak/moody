import { View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Text } from '../components/Text';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, MoodKey } from '../theme/theme';
import { RootStackParamList } from '../types/navigation';
import {
  gateDateStr,
  getDayTimeIcon,
  getTimeStr,
  getWeekdayKey,
} from '@/helpers/date';

const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};

export default function MoodDetailsScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'MoodDetails'>>();
  const { mood } = route.params;

  const date = new Date(mood.timestamp);
  const timeStr = getTimeStr(date);
  const dayTimeIcon = getDayTimeIcon(date.getHours());
  const weekday = getWeekdayKey(date.getDay());
  const dateStr = gateDateStr(date);

  const theme = lightTheme;
  const moodColor = theme[mood.label as MoodKey] ?? theme.okay;
  const icon = moodIcons[mood.label] ?? moodIcons.okay;
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
          {t('moodDetails.title')}
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-2">
        <View className="p-6 rounded-2xl bg-white dark:bg-gray-800 items-center">
          {/* Mood icon */}
          <View
            className="w-24 h-24 rounded-full items-center justify-center mb-4"
            style={{ backgroundColor: moodColor + '4D' }}
          >
            <FontAwesomeIcon icon={icon} size={50} color={moodColor} />
          </View>

          {/* Mood label */}
          <Text weight="bold" className="text-2xl mb-2" style={{ color: textColor }}>
            {t(`moods.${mood.label}`)}
          </Text>

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

          {/* Note if present */}
          {mood.note ? (
            <View className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-base leading-6" style={{ color: textColor }}>
                {mood.note}
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
