import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrown,
  faFaceSadTear,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text';
import { useTheme } from '@/context/ThemeContext';
import { lightTheme } from '@/theme/theme';
import { MOOD_KEYS, MoodEntry } from '@/types/mood';
import { colors } from '@/theme/colors';
import { useMoodChartData } from '@/components/MoodChart/useMoodChartData';

const MOOD_ICONS = [
  faFaceSadTear,
  faFaceFrown,
  faFaceMeh,
  faFaceSmile,
  faFaceGrinStars,
];
const VISIBLE_DAYS = 14;
const SCREEN_WIDTH = Dimensions.get('window').width;
const CHART_PADDING = 60;
const SPACING = (SCREEN_WIDTH - CHART_PADDING) / VISIBLE_DAYS;
const CHART_HEIGHT = 200;

interface MoodChartProps {
  moods: MoodEntry[];
  year: number;
  month: number;
  scrollToEnd?: boolean;
}

export function MoodChart({
  moods,
  year,
  month,
  scrollToEnd = false,
}: MoodChartProps) {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const theme = lightTheme;
  const textColor = isDark ? colors.lightGray : colors.midGray;
  const ruleColor = isDark
    ? colors.charcoalBlue[700]
    : colors.charcoalBlue[100];

  const { data, lineSegments, hasData } = useMoodChartData(moods, year, month);

  // Apply label text styling (theme-dependent) at render time
  const styledData = useMemo(
    () =>
      data.map((point) => ({
        ...point,
        labelTextStyle: { color: textColor, fontSize: 10 },
      })),
    [data, textColor]
  );

  if (!hasData) {
    return null;
  }

  return (
    <View className="p-6 rounded-2xl bg-white dark:bg-darkGray">
      <Text
        weight="bold"
        className="text-sm text-gray-600 dark:text-gray-400 mb-4"
      >
        {t('oversight.moodTrend')}
      </Text>
      <View className="flex-row">
        {/* Custom Y-axis with face icons */}
        <View
          className={`w-8 h-[${CHART_HEIGHT + 20}px] justify-between items-center py-[2px]`}
        >
          {[...MOOD_KEYS].reverse().map((mood, index) => (
            <FontAwesomeIcon
              key={mood}
              icon={MOOD_ICONS[4 - index] as IconProp}
              size={18}
              color={theme[mood]}
            />
          ))}
        </View>

        {/* Chart */}
        <View className="flex-1 overflow-hidden">
          <LineChart
            data={styledData}
            height={CHART_HEIGHT}
            spacing={SPACING}
            initialSpacing={10}
            endSpacing={10}
            thickness={2.5}
            hideDataPoints={false}
            dataPointsRadius={5}
            dataPointsColor={isDark ? colors.dirtyWhite : colors.darkGray}
            color="transparent"
            lineSegments={lineSegments}
            xAxisLabelTextStyle={{ color: textColor, fontSize: 10 }}
            xAxisColor={ruleColor}
            hideYAxisText
            yAxisColor="transparent"
            maxValue={4}
            noOfSections={4}
            rulesColor={ruleColor}
            rulesType="solid"
            scrollToEnd={scrollToEnd}
            isAnimated
            curved
          />
        </View>
      </View>
    </View>
  );
}
