import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';
import { useColorScheme } from 'nativewind';

function ScrollMask() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <>
      {/* Top fade */}
      <LinearGradient
        colors={
          isDark
            ? [colors.darkBlue, `${colors.dirtyWhite}00`]
            : [colors.dirtyWhite, `${colors.darkBlue}00`]
        }
        className="absolute top-0 left-0 right-0 h-6 z-10"
        pointerEvents="none"
      />
      {/* Bottom fade */}
      <LinearGradient
        colors={
          isDark
            ? [`${colors.darkBlue}00`, colors.darkBlue]
            : [`${colors.dirtyWhite}00`, colors.dirtyWhite]
        }
        className="absolute bottom-0 left-0 right-0 h-6 z-10"
        pointerEvents="none"
      />
    </>
  );
}

export default ScrollMask;
