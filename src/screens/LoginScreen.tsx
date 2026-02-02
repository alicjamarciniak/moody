import { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ImageBackground,
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
import { colors } from '@/theme/colors';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { t } = useTranslation();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const textColor = '#1f2937';
  const placeholderColor = '#9ca3af';
  const inputBg = '#ffffff';
  const inputBorder = '#d1d5db';
  const iconColor = '#6b7280';
  const errorBorder = '#ef4444';

  const emailError =
    touchedEmail && email.trim() !== '' && !EMAIL_REGEX.test(email.trim())
      ? t('auth.invalidEmail')
      : null;

  const handleSignIn = async () => {
    setTouchedEmail(true);
    if (!email.trim() || !password.trim()) return;
    if (!EMAIL_REGEX.test(email.trim())) return;
    setIsSubmitting(true);
    try {
      await signIn(email.trim(), password);
    } catch {
      Alert.alert(t('common.error'), t('auth.signInFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch {
      Alert.alert(t('common.error'), t('auth.googleSignInFailed'));
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
        imageStyle={{ opacity: 1 }}
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
                className="text-3xl text-center mb-10"
                style={{ color: textColor }}
              >
                {t('auth.login')}
              </Text>

              <View style={{ marginBottom: emailError ? 4 : 12 }}>
                <TextInput
                  placeholder={t('auth.email')}
                  placeholderTextColor={placeholderColor}
                  value={email}
                  onChangeText={setEmail}
                  onBlur={() => setTouchedEmail(true)}
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

              <View style={{ marginBottom: 24 }}>
                <TextInput
                  placeholder={t('auth.password')}
                  placeholderTextColor={placeholderColor}
                  value={password}
                  onChangeText={setPassword}
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

              <Button
                variant="solid"
                size="lg"
                text={t('auth.login')}
                onPress={handleSignIn}
                disabled={isSubmitting || !email.trim() || !password.trim()}
                style={{ opacity: isSubmitting ? 0.5 : 1, marginBottom: 12 }}
              />

              <Button
                variant="outlined"
                size="lg"
                text={t('auth.googleSignIn')}
                onPress={handleGoogleSignIn}
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.5 : 1 }}
              />

              <View className="flex-row justify-center mt-6">
                <Text style={{ color: '#6b7280' }}>{t('auth.noAccount')} </Text>
                <Text
                  weight="bold"
                  className="text-bubblegum"
                  onPress={() => navigation.navigate('Signup')}
                >
                  {t('auth.signup')}
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
