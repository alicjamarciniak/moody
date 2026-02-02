import { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { colors } from '@/theme/colors';
import { AVATARS, AVATAR_IMAGES, AvatarKey } from '../types/user';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SignupScreenProps = NativeStackScreenProps<RootStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarKey>('bear');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const textColor = '#1f2937';
  const placeholderColor = '#9ca3af';
  const inputBg = '#ffffff';
  const inputBorder = '#d1d5db';
  const iconColor = '#6b7280';
  const errorBorder = '#ef4444';

  const emailError =
    touched.email && email.trim() !== '' && !EMAIL_REGEX.test(email.trim())
      ? t('auth.invalidEmail')
      : null;
  const passwordsMismatchError =
    touched.confirmPassword &&
    confirmPassword.trim() !== '' &&
    password !== confirmPassword
      ? t('auth.passwordsMismatch')
      : null;

  const handleSignUp = async () => {
    setTouched({ email: true, password: true, confirmPassword: true });
    if (!displayName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) return;
    if (!EMAIL_REGEX.test(email.trim())) return;
    if (password !== confirmPassword) return;
    setIsSubmitting(true);
    try {
      await signUp(email.trim(), password, {
        avatar: selectedAvatar,
        displayName: displayName.trim(),
      });
    } catch {
      Alert.alert(t('common.error'), t('auth.signUpFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightYellow[50] }}>
      <ImageBackground
        source={require('../../assets/moods.png')}
        resizeMode="cover"
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.6 }}
      >
        <SafeAreaView className="flex-1">
          <StatusBar style="dark" />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
          >
            <View className="flex-1 justify-center px-8">
              <Text
                weight="bold"
                className="text-3xl text-center mb-6"
                style={{ color: textColor }}
              >
                {t('auth.signup')}
              </Text>

              <Text
                weight="medium"
                className="text-sm text-center mb-3"
                style={{ color: iconColor }}
              >
                {t('auth.chooseAvatar')}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10,
                  marginBottom: 16,
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
                        borderColor:
                          selectedAvatar === key ? '#f472b6' : inputBorder,
                      }}
                    />
                  </Pressable>
                ))}
              </View>

              <View style={{ marginBottom: 12 }}>
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
                  }}
                />
              </View>

              <View style={{ marginBottom: emailError ? 4 : 12 }}>
                <TextInput
                  placeholder={t('auth.email')}
                  placeholderTextColor={placeholderColor}
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={{
                    color: textColor,
                    backgroundColor: inputBg,
                    borderColor: emailError ? errorBorder : inputBorder,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    fontSize: 16,
                    fontFamily: 'Roboto_300Light',
                  }}
                />
              </View>
              {emailError && (
                <Text className="text-red-500 text-xs mb-2 ml-1">
                  {emailError}
                </Text>
              )}

              <View style={{ marginBottom: 12 }}>
                <TextInput
                  placeholder={t('auth.password')}
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, password: true }))
                  }
                  secureTextEntry={!showPassword}
                  style={{
                    color: textColor,
                    backgroundColor: inputBg,
                    borderColor: inputBorder,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingRight: 48,
                    paddingVertical: 14,
                    fontSize: 16,
                    fontFamily: 'Roboto_300Light',
                  }}
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                  }}
                  hitSlop={8}
                >
                  <FontAwesomeIcon
                    icon={(showPassword ? faEyeSlash : faEye) as IconProp}
                    size={18}
                    color={iconColor}
                  />
                </Pressable>
              </View>

              <View style={{ marginBottom: passwordsMismatchError ? 4 : 24 }}>
                <TextInput
                  placeholder={t('auth.confirmPassword')}
                  placeholderTextColor={placeholderColor}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, confirmPassword: true }))
                  }
                  secureTextEntry={!showConfirmPassword}
                  style={{
                    color: textColor,
                    backgroundColor: inputBg,
                    borderColor: passwordsMismatchError
                      ? errorBorder
                      : inputBorder,
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingRight: 48,
                    paddingVertical: 14,
                    fontSize: 16,
                    fontFamily: 'Roboto_300Light',
                  }}
                />
                <Pressable
                  onPress={() => setShowConfirmPassword((prev) => !prev)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                  }}
                  hitSlop={8}
                >
                  <FontAwesomeIcon
                    icon={
                      (showConfirmPassword ? faEyeSlash : faEye) as IconProp
                    }
                    size={18}
                    color={iconColor}
                  />
                </Pressable>
              </View>
              {passwordsMismatchError && (
                <Text className="text-red-500 text-xs mb-4 ml-1">
                  {passwordsMismatchError}
                </Text>
              )}

              <Button
                variant="solid"
                size="lg"
                text={t('auth.signup')}
                onPress={handleSignUp}
                disabled={
                  isSubmitting ||
                  !displayName.trim() ||
                  !email.trim() ||
                  !password.trim() ||
                  !confirmPassword.trim()
                }
                style={{ opacity: isSubmitting ? 0.5 : 1 }}
              />

              <View className="flex-row justify-center mt-6">
                <Text style={{ color: '#6b7280' }}>
                  {t('auth.hasAccount')}{' '}
                </Text>
                <Text
                  weight="bold"
                  className="text-bubblegum"
                  onPress={() => navigation.navigate('Login')}
                >
                  {t('auth.login')}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
