import { useEffect, useRef, ReactNode } from 'react';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();
  const { setColorScheme } = useNativeWindColorScheme();
  const opacity = useSharedValue(1);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setColorScheme(theme);
      return;
    }

    const applyTheme = () => {
      setColorScheme(theme);
    };

    opacity.value = withSequence(
      withTiming(0, { duration: 150 }, () => {
        runOnJS(applyTheme)();
      }),
      withTiming(1, { duration: 250 }),
    );
  }, [theme]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    flex: 1,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}
