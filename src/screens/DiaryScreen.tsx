import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { InProgressBanner } from '../components/InProgressBanner';
import { ScreenWrapper } from '../components/ScreenWrapper';

export default function DiaryScreen() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper>
      <View className="px-5 pt-4 pb-2">
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('insights.title')}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {t('insights.subtitle')}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center p-5">
        <InProgressBanner />
      </View>
    </ScreenWrapper>
  );
}
