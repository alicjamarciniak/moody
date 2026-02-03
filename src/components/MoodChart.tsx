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
import { Text } from './Text';
import { useTheme } from '../context/ThemeContext';
import { lightTheme, MoodKey } from '../theme/theme';
import { MOOD_KEYS, MoodEntry } from '../types/mood';
import { colors } from '@/theme/colors';
import { getDaysInMonth } from '@/helpers/date';

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
  const theme = lightTheme; // Always use bright colors for better visibility
  const textColor = isDark ? colors.lightGray : colors.midGray;
  const ruleColor = isDark
    ? colors.charcoalBlue[700]
    : colors.charcoalBlue[100];

  const { data, lineSegments, hasData } = useMemo(() => {
    const totalDays = getDaysInMonth(year, month);

    // Group moods by day of month
    const moodByDay: Record<number, MoodEntry[]> = {};
    moods.forEach((mood) => {
      const d = new Date(mood.timestamp);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        if (!moodByDay[day]) moodByDay[day] = [];
        moodByDay[day].push(mood);
      }
    });

    // Find first and last day with mood data
    const daysWithData: number[] = [];
    for (let day = 1; day <= totalDays; day++) {
      if (moodByDay[day]?.length) daysWithData.push(day);
    }

    if (daysWithData.length === 0) {
      // Build empty chart with all days
      const emptyData = [];
      for (let day = 1; day <= totalDays; day++) {
        const showLabel = day % 2 === 1;
        emptyData.push({
          value: 0,
          label: showLabel ? `${day}` : '',
          labelTextStyle: { color: textColor, fontSize: 10 },
          hideDataPoint: true,
        });
      }
      return { data: emptyData, lineSegments: [], hasData: false };
    }

    const firstDataDay = daysWithData[0];
    const lastDataDay = daysWithData[daysWithData.length - 1];

    // Build raw mood values per day (null if no data)
    const rawByDay: Record<number, { value: number; mood: MoodKey }> = {};
    for (const day of daysWithData) {
      const dayMoods = moodByDay[day];
      const avg =
        dayMoods.reduce((sum, m) => sum + m.value, 0) / dayMoods.length;
      const value = Math.round(avg);
      rawByDay[day] = { value, mood: MOOD_KEYS[value] };
    }

    // Precompute boundary values for outside-range days
    const firstValue = rawByDay[firstDataDay].value;
    const lastValue = rawByDay[lastDataDay].value;

    // Build chart data for all days, carrying forward values between data points
    const chartData: {
      value: number;
      label: string;
      labelTextStyle: object;
      hideDataPoint?: boolean;
      dataPointColor?: string;
    }[] = [];
    // Track the mood at each chart index (for segment coloring)
    const moodAtIndex: MoodKey[] = [];
    let lastKnownValue = firstValue;
    let lastKnownMood: MoodKey = MOOD_KEYS[firstValue];

    for (let day = 1; day <= totalDays; day++) {
      const showLabel = day % 2 === 1;
      const hasRealData = rawByDay[day] !== undefined;
      const inRange = day >= firstDataDay && day <= lastDataDay;

      if (hasRealData) {
        lastKnownValue = rawByDay[day].value;
        lastKnownMood = rawByDay[day].mood;

        chartData.push({
          value: lastKnownValue,
          label: showLabel ? `${day}` : '',
          labelTextStyle: { color: textColor, fontSize: 10 },
          dataPointColor: theme[lastKnownMood],
        });
        moodAtIndex.push(lastKnownMood);
      } else if (inRange) {
        // Between data points — carry forward last known value, show dot
        chartData.push({
          value: lastKnownValue,
          label: showLabel ? `${day}` : '',
          labelTextStyle: { color: textColor, fontSize: 10 },
          dataPointColor: theme[lastKnownMood],
        });
        moodAtIndex.push(lastKnownMood);
      } else {
        // Outside data range — use nearest boundary value to avoid line drops
        const boundaryValue = day < firstDataDay ? firstValue : lastValue;
        chartData.push({
          value: boundaryValue,
          label: showLabel ? `${day}` : '',
          labelTextStyle: { color: textColor, fontSize: 10 },
          hideDataPoint: true,
        });
        moodAtIndex.push(MOOD_KEYS[boundaryValue]);
      }
    }

    // Build line segments colored by the destination point's mood
    const rangeStart = firstDataDay - 1; // 0-based index
    const rangeEnd = lastDataDay - 1;
    const segments: { startIndex: number; endIndex: number; color: string }[] =
      [];

    // Group consecutive indices that share the same destination mood
    let segStart = rangeStart;
    let segColor = moodAtIndex[rangeStart + 1] ?? moodAtIndex[rangeStart];

    for (let i = rangeStart + 1; i <= rangeEnd; i++) {
      const destMood = moodAtIndex[i];
      if (destMood !== segColor) {
        segments.push({
          startIndex: segStart,
          endIndex: i - 1,
          color: theme[segColor],
        });
        segStart = i - 1;
        segColor = destMood;
      }
    }
    // Close final segment
    segments.push({
      startIndex: segStart,
      endIndex: rangeEnd,
      color: theme[segColor],
    });

    return { data: chartData, lineSegments: segments, hasData: true };
  }, [moods, year, month, isDark, theme, textColor]);

  if (!hasData) {
    return null;
  }

  // Section height for positioning y-axis icons
  const sectionHeight = CHART_HEIGHT / 4;

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
            data={data}
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
