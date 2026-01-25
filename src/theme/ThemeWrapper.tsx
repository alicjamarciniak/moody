import { useEffect, ReactNode } from 'react';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { useTheme } from '../context/ThemeContext';

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();
  const { setColorScheme } = useNativeWindColorScheme();

  useEffect(() => {
    setColorScheme(theme);
  }, [theme, setColorScheme]);

  return <>{children}</>;
}
