import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  weight?: 'regular' | 'medium' | 'bold';
}

export function Text({ style, weight = 'regular', ...props }: TextProps) {
  const fontFamily = {
    regular: 'Roboto_300Light',
    medium: 'Roboto_500Medium',
    bold: 'Roboto_700Bold',
  }[weight];

  return <RNText style={[{ fontFamily }, style]} {...props} />;
}

// Convenience exports for different weights
export function TextRegular(props: RNTextProps) {
  return <Text weight="regular" {...props} />;
}

export function TextMedium(props: RNTextProps) {
  return <Text weight="medium" {...props} />;
}

export function TextBold(props: RNTextProps) {
  return <Text weight="bold" {...props} />;
}
