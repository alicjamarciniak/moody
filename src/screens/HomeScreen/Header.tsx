import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Text } from '@/components/Text';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { useTheme } from '@/context/ThemeContext';

const Header = () => {
  const { isDark } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
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
        <View className="flex-row items-center gap-4">
          <ThemeToggle />
          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <FontAwesomeIcon
              icon={faGear as IconProp}
              size={20}
              color={isDark ? '#9ca3af' : '#6b7280'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <SettingsDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
};

export default Header;
