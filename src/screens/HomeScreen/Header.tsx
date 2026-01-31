import { LanguageSwitcher } from '@/components';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/Text';

const Header = () => {
  return (
    <View className="px-5 pt-4 pb-2 flex-row justify-between items-center">
      <View>
        <Text
          weight="bold"
          className="text-2xl text-gray-800 dark:text-gray-100"
        >
          {t('home.title')}
        </Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          {t('home.subtitle')}
        </Text>
      </View>
      <LanguageSwitcher />
    </View>
  );
};

export default Header;
