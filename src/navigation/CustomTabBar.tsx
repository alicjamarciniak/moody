import { View, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tColors from 'tailwindcss/colors';
import { useTheme } from '../context/ThemeContext';
import type { NavigationRoute, ParamListBase } from '@react-navigation/native';

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  // Hide tab bar on Welcome screen
  const currentRoute = state.routes[state.index];
  if (currentRoute.name === 'Welcome') {
    return null;
  }

  const middleIndex = Math.floor(state.routes.length / 2);

  const onPress = (
    route: NavigationRoute<ParamListBase, string>,
    isFocused: boolean
  ) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View className="flex-row border-t border-gray-200 dark:border-gray-700 bg-light dark:bg-dark" style={{ height: 60 + insets.bottom, paddingBottom: insets.bottom }}>
      {state.routes.map((route, index) => {
        const {
          options: { tabBarIcon, tabBarLabel },
        } = descriptors[route.key];
        const isFocused = state.index === index;
        const isMiddle = index === middleIndex;
        const regularColor = isFocused ? colors.bubblegum : tColors.gray[500];

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() =>
              isMiddle
                ? navigation.getParent()?.navigate('Welcome')
                : onPress(route, isFocused)
            }
            className="flex-1 items-center justify-center"
          >
            {/* middle "+" btn */}
            {isMiddle ? (
              <View className="w-16 h-16 rounded-full items-center justify-center -mt-9 bg-bubblegum shadow-lg shadow-black/40 elevation-8">
                <FontAwesomeIcon
                  icon={faPlus as IconProp}
                  size={24}
                  color={colors.light}
                />
              </View>
            ) : (
              <>
                {/* regular tab btn */}
                {tabBarIcon?.({
                  color: regularColor,
                  focused: isFocused,
                  size: 20,
                })}
                {tabBarLabel && (
                  <View className="mt-0.5">
                    {typeof tabBarLabel === 'function'
                      ? tabBarLabel({
                          focused: isFocused,
                          color: regularColor,
                          position: 'below-icon',
                          children: route.name,
                        })
                      : null}
                  </View>
                )}
              </>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
