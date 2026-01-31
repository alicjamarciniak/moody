import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import { Text } from './Text';
import { useTheme } from '@/context/ThemeContext';

type Variant = 'solid' | 'outlined';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: Variant;
  size?: Size;
  text?: string;
  textWeight?: 'regular' | 'medium' | 'bold';
  color?: string;
  darkColor?: string;
  textColor?: string;
  darkTextColor?: string;
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 rounded-lg',
  md: 'px-5 py-3 rounded-xl',
  lg: 'px-7 py-4 rounded-xl',
};

const textSizeStyles: Record<Size, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  variant = 'solid',
  size = 'md',
  text,
  textWeight = 'bold',
  color,
  darkColor,
  textColor,
  darkTextColor,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  const { isDark } = useTheme();

  const resolvedColor = isDark && darkColor ? darkColor : color;
  const resolvedTextColor = isDark && darkTextColor ? darkTextColor : textColor;

  const variantClass =
    variant === 'solid'
      ? 'bg-primary-dark dark:bg-primary'
      : 'bg-transparent border-2 border-dark dark:border-light';

  const defaultTextClass =
    variant === 'solid'
      ? 'text-light dark:text-dark'
      : 'text-dark dark:text-light';

  const colorStyle: ViewStyle =
    variant === 'solid'
      ? resolvedColor
        ? { backgroundColor: resolvedColor }
        : {}
      : resolvedColor
        ? { borderColor: resolvedColor }
        : {};

  return (
    <TouchableOpacity
      className={`items-center ${sizeStyles[size]} ${variantClass} ${className ?? ''}`}
      style={[colorStyle, style]}
      {...props}
    >
      {children ?? (
        <Text
          weight={textWeight}
          className={`${textSizeStyles[size]} ${resolvedTextColor ? '' : defaultTextClass}`}
          {...(resolvedTextColor ? { style: { color: resolvedTextColor } } : {})}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
}
