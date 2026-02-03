import React from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';

interface ScreenWrapperProps {
  children: React.ReactNode;
  className?: string;
  statusBarStyle?: 'light' | 'dark' | 'auto';
}

export function ScreenWrapper({
  children,
  className = 'flex-1 bg-gray-100 dark:bg-gray-900',
  statusBarStyle,
}: ScreenWrapperProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      className={className}
      style={{ height: 60 + insets.bottom, paddingBottom: insets.bottom }}
    >
      <StatusBar style={statusBarStyle ?? (isDark ? 'light' : 'dark')} />
      {children}
    </SafeAreaView>
  );
}
