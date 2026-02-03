import { colors } from '@/theme/colors';
import React from 'react';
import { type ActivityIndicatorProps, ActivityIndicator } from 'react-native';

function Spinner({ size = 'large' }: ActivityIndicatorProps) {
  return <ActivityIndicator size={size} color={colors.bubblegum[400]} />;
}

export default Spinner;
