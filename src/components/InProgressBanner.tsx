import { View, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Text } from './Text';

export function InProgressBanner() {
  const { t } = useTranslation();

  return (
    <View className="items-center py-8">
      <Image
        className="w-32 h-32"
        source={require('../../assets/wip.png')}
        resizeMode="contain"
      />
      <Text
        weight="bold"
        className="text-lg mt-5 text-center text-darkGray dark:text-dirtyWhite"
      >
        {t('common.inProgress')}
      </Text>
      <Text className="text-sm mt-1 text-center text-midGray dark:text-lightGray">
        {t('common.inProgressSubtitle')}
      </Text>
    </View>
  );
}
