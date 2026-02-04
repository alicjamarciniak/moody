import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Text } from '@/components/Text';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { AVATAR_IMAGES } from '@/types/user';
import { colors } from '@/theme/colors';

// TODO: Refactor
// - replace hex colors with variables
// - remove inline styles

const Header = () => {
  const { isDark } = useTheme();
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const greeting = userProfile?.displayName
    ? `${t('home.hello')}, ${userProfile.displayName}`
    : t('home.title');

  return (
    <>
      <View className="px-5 pt-4 pb-2 flex-row justify-between items-center mb-3">
        <View className="flex-row items-center gap-3 flex-1">
          {userProfile?.avatar && (
            <Image
              source={AVATAR_IMAGES[userProfile.avatar]}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                borderWidth: 3,
                borderColor: colors.bubblegum[400],
              }}
            />
          )}
          <View className="flex-1">
            <Text
              weight="bold"
              className="text-2xl text-gray-800 dark:text-gray-100"
              numberOfLines={1}
            >
              {greeting}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {t('home.subtitle')}
            </Text>
          </View>
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
