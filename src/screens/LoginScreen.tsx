import { useState } from 'react';
import { View, TextInput, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '../components/Text';
import { Button } from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const placeholderColor = isDark ? '#6b7280' : '#9ca3af';
  const inputBg = isDark ? '#1f2937' : '#ffffff';
  const inputBorder = isDark ? '#374151' : '#d1d5db';

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) return;
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
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          <Text
            weight="bold"
            className="text-3xl text-gray-800 dark:text-gray-100 text-center mb-10"
          >
            {t('auth.login')}
          </Text>

          <TextInput
            placeholder={t('auth.email')}
            placeholderTextColor={placeholderColor}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={{
              color: textColor,
              backgroundColor: inputBg,
              borderColor: inputBorder,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              marginBottom: 12,
              fontFamily: 'Roboto_300Light',
            }}
          />

          <TextInput
            placeholder={t('auth.password')}
            placeholderTextColor={placeholderColor}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              color: textColor,
              backgroundColor: inputBg,
              borderColor: inputBorder,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
              marginBottom: 24,
              fontFamily: 'Roboto_300Light',
            }}
          />

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
            <Text className="text-gray-500 dark:text-gray-400">
              {t('auth.noAccount')}{' '}
            </Text>
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
  );
}
