import React, { useState } from 'react';
import { View, Image, Pressable, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AVATARS, AVATAR_IMAGES, AvatarKey } from '../types/user';
import { updateUserProfile } from '../services/userService';
import { colors } from '@/theme/colors';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigation = useNavigation();

  const [selectedAvatar, setSelectedAvatar] = useState<AvatarKey>(
    userProfile?.avatar ?? 'bear'
  );
  const [displayName, setDisplayName] = useState(
    userProfile?.displayName ?? ''
  );
  const [isSaving, setIsSaving] = useState(false);

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const inputBg = isDark ? '#374151' : '#ffffff';
  const inputBorder = isDark ? '#4b5563' : '#d1d5db';
  const placeholderColor = isDark ? '#6b7280' : '#9ca3af';

  const hasChanges =
    selectedAvatar !== (userProfile?.avatar ?? 'bear') ||
    displayName.trim() !== (userProfile?.displayName ?? '');

  const handleSave = async () => {
    if (!user || !displayName.trim()) return;
    setIsSaving(true);
    try {
      await updateUserProfile(user.uid, {
        avatar: selectedAvatar,
        displayName: displayName.trim(),
      });
      await refreshUserProfile();
      navigation.goBack();
    } catch {
      Alert.alert(t('common.error'), t('common.saveFailed'));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <Pressable onPress={() => navigation.goBack()} className="mr-3">
          <FontAwesomeIcon
            icon={faChevronLeft as IconProp}
            size={18}
            color={textColor}
          />
        </Pressable>
        <Text weight="bold" className="text-lg" style={{ color: textColor }}>
          {t('profile.title')}
        </Text>
      </View>

      <View className="flex-1 px-5 pt-6">
        {/* Avatar picker */}
        <Text
          weight="medium"
          className="text-sm text-center mb-3"
          style={{ color: placeholderColor }}
        >
          {t('auth.chooseAvatar')}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 24,
          }}
        >
          {AVATARS.map((key) => (
            <Pressable key={key} onPress={() => setSelectedAvatar(key)}>
              <Image
                source={AVATAR_IMAGES[key]}
                style={{
                  width: selectedAvatar === key ? 60 : 56,
                  height: selectedAvatar === key ? 60 : 56,
                  borderRadius: selectedAvatar === key ? 30 : 28,
                  borderWidth: selectedAvatar === key ? 5 : 1,
                  borderColor: selectedAvatar === key ? '#f472b6' : inputBorder,
                }}
              />
            </Pressable>
          ))}
        </View>

        {/* Display name */}
        <Text
          weight="medium"
          className="text-sm mb-2"
          style={{ color: placeholderColor }}
        >
          {t('auth.displayName')}
        </Text>
        <TextInput
          placeholder={t('auth.displayName')}
          placeholderTextColor={placeholderColor}
          value={displayName}
          onChangeText={setDisplayName}
          autoCapitalize="words"
          style={{
            color: textColor,
            backgroundColor: inputBg,
            borderColor: inputBorder,
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            fontSize: 16,
            fontFamily: 'Roboto_300Light',
            marginBottom: 24,
          }}
        />

        <Button
          variant="solid"
          darkColor={colors.dirtyWhite}
          darkTextColor={colors.darkGray}
          size="lg"
          text={t('common.save')}
          onPress={handleSave}
          disabled={isSaving || !displayName.trim() || !hasChanges}
          style={{ opacity: isSaving || !hasChanges ? 0.5 : 1 }}
        />
      </View>
    </ScreenWrapper>
  );
}
