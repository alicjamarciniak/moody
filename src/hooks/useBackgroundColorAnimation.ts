import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface Props {
  mood: string;
  duration?: number;
  colorMap: Record<string, { light: string; dark: string }>;
}

export function useBackgroundColorAnimation({
  mood,
  duration = 500,
  colorMap,
}: Props) {
  const colorScheme = useColorScheme();

  const getCurrentColor = (moodKey: string) => {
    return colorScheme === 'dark'
      ? colorMap[moodKey].dark
      : colorMap[moodKey].light;
  };

  const currentColor = useSharedValue(getCurrentColor(mood));
  const targetColor = useSharedValue(getCurrentColor(mood));
  const animationProgress = useSharedValue(1);

  useEffect(() => {
    const newColor = getCurrentColor(mood);
    currentColor.value = targetColor.value;
    targetColor.value = newColor;
    animationProgress.value = 0;
    animationProgress.value = withTiming(1, { duration });
  }, [mood, colorScheme, duration]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationProgress.value,
      [0, 1],
      [currentColor.value, targetColor.value]
    );
    return { backgroundColor };
  });

  return animatedStyle;
}
