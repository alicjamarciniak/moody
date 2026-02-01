import { View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';

export function InProgressBanner() {
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const subtitleColor = isDark ? '#9ca3af' : '#6b7280';

  return (
    <View className="items-center py-8">
      <Image
        source={require('../../assets/wip.png')}
        style={{ width: 120, height: 120 }}
        resizeMode="contain"
      />
      <Text
        weight="bold"
        className="text-lg mt-5 text-center"
        style={{ color: textColor }}
      >
        {t('common.inProgress')}
      </Text>
      <Text
        className="text-sm mt-1 text-center"
        style={{ color: subtitleColor }}
      >
        {t('common.inProgressSubtitle')}
      </Text>
    </View>
  );
}
