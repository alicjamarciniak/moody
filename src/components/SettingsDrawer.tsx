import React, { useEffect } from 'react';
import { Modal, Pressable, Dimensions, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from './Text';
import { Button } from './Button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';

const DRAWER_WIDTH = Dimensions.get('window').width * 0.75;

interface SettingsDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export function SettingsDrawer({ visible, onClose }: SettingsDrawerProps) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(DRAWER_WIDTH);

  useEffect(() => {
    translateX.value = withTiming(visible ? 0 : DRAWER_WIDTH, { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 bg-black/40">
        <Animated.View
          style={[
            {
              width: DRAWER_WIDTH,
              position: 'absolute',
              right: 0,
              height: '100%',
            },
            animatedStyle,
          ]}
          className="bg-gray-100 dark:bg-gray-900 pt-16 px-5"
        >
          <Pressable>
            <Text
              weight="bold"
              className="text-xl text-gray-800 dark:text-gray-100 mb-6"
            >
              {t('settings.title')}
            </Text>

            <Button
              variant="outlined"
              size="md"
              text={t('profile.title')}
              onPress={() => {
                onClose();
                navigation.navigate('Profile');
              }}
            />

            <Text
              weight="medium"
              className="text-sm text-gray-600 dark:text-gray-400 mb-3 mt-6"
            >
              {t('settings.language')}
            </Text>
            <LanguageSwitcher />

            <View className="mt-8">
              <Button
                variant="outlined"
                size="md"
                text={t('auth.signOut')}
                onPress={signOut}
              />
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
