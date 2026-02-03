import { useMemo } from 'react';
import { lightTheme, MoodKey, ThemeColors } from '../../theme/theme';
import { MOOD_KEYS, MoodEntry } from '../../types/mood';
import { getDaysInMonth } from '@/helpers/date';

interface ChartDataPoint {
  value: number;
  label: string;
  hideDataPoint?: boolean;
  dataPointColor?: string;
}

interface LineSegment {
  startIndex: number;
  endIndex: number;
  color: string;
}

interface MoodChartData {
  data: ChartDataPoint[];
  lineSegments: LineSegment[];
  hasData: boolean;
}

// group moods by days
type MoodsByDay = Record<number, MoodEntry[]>;
const groupMoodsByDays = ({
  moods,
  year,
  month,
}: {
  moods: MoodEntry[];
  year: number;
  month: number;
}): MoodsByDay => {
  const moodByDay: MoodsByDay = {};
  moods.forEach((mood) => {
    const d = new Date(mood.timestamp);

    if (d.getFullYear() === year && d.getMonth() === month) {
      const day = d.getDate();
      if (!moodByDay[day]) moodByDay[day] = [];
      moodByDay[day].push(mood);
    }
  });

  return moodByDay;
};

const getEmptyChartData = (totalDays: number) => {
  const emptyData: ChartDataPoint[] = [];
  for (let day = 1; day <= totalDays; day++) {
    const showLabel = day % 2 === 1;
    emptyData.push({
      value: 0,
      label: showLabel ? `${day}` : '',
      hideDataPoint: true,
    });
  }
  return emptyData;
};

// Build list of days with assigned top mood value
type TopMoodValues = Record<number, { value: number; mood: MoodKey }>;

const getTopMoodValuesByDays = (
  daysWithData: number[],
  moodByDay: Record<number, MoodEntry[]>
): TopMoodValues => {
  const topValuesByDays: Record<number, { value: number; mood: MoodKey }> = {};
  for (const day of daysWithData) {
    const dayMoods = moodByDay[day];
    const counts: Record<number, number> = {};
    for (const m of dayMoods) {
      counts[m.value] = (counts[m.value] || 0) + 1;
    }
    const value = Number(
      Object.entries(counts).reduce((top, curr) =>
        curr[1] > top[1] ||
        (curr[1] === top[1] && Number(curr[0]) > Number(top[0]))
          ? curr
          : top
      )[0]
    );
    topValuesByDays[day] = { value, mood: MOOD_KEYS[value] };
  }

  return topValuesByDays;
};

const getChartDataPoints = ({
  firstDataDay,
  lastDataDay,
  firstValue,
  lastValue,
  totalDays,
  topMoodValues,
  theme,
}: {
  firstDataDay: number;
  lastDataDay: number;
  firstValue: number;
  lastValue: number;
  totalDays: number;
  topMoodValues: TopMoodValues;
  theme: ThemeColors;
}) => {
  const chartData: ChartDataPoint[] = [];
  const moodAtIndex: MoodKey[] = [];
  let lastKnownValue = firstValue;
  let lastKnownMood: MoodKey = MOOD_KEYS[firstValue];

  for (let day = 1; day <= totalDays; day++) {
    const showLabel = day % 2 === 1;
    const hasRecordedData = topMoodValues[day] !== undefined;
    const inRange = day >= firstDataDay && day <= lastDataDay;

    if (hasRecordedData) {
      lastKnownValue = topMoodValues[day].value;
      lastKnownMood = topMoodValues[day].mood;
      chartData.push({
        value: lastKnownValue,
        label: showLabel ? `${day}` : '',
        dataPointColor: theme[lastKnownMood],
      });
      moodAtIndex.push(lastKnownMood);
    } else if (inRange) {
      chartData.push({
        value: lastKnownValue,
        label: showLabel ? `${day}` : '',
        dataPointColor: theme[lastKnownMood],
      });
      moodAtIndex.push(lastKnownMood);
    } else {
      const boundaryValue = day < firstDataDay ? firstValue : lastValue;
      chartData.push({
        value: boundaryValue,
        label: showLabel ? `${day}` : '',
        hideDataPoint: true,
      });
      moodAtIndex.push(MOOD_KEYS[boundaryValue]);
    }
  }

  return { chartData, moodAtIndex };
};

export function useMoodChartData(
  moods: MoodEntry[],
  year: number,
  month: number
): MoodChartData {
  const theme = lightTheme;

  return useMemo(() => {
    const totalDays = getDaysInMonth(year, month);
    const moodByDay = groupMoodsByDays({ moods, year, month });

    // Find first and last day with mood data
    const daysWithData: number[] = [];
    for (let day = 1; day <= totalDays; day++) {
      if (moodByDay[day]?.length) daysWithData.push(day);
    }

    // Build empty chart
    if (daysWithData.length === 0) {
      return {
        data: getEmptyChartData(totalDays),
        lineSegments: [],
        hasData: false,
      };
    }

    const topMoodValues = getTopMoodValuesByDays(daysWithData, moodByDay);

    // Precompute boundary values for outside-range days
    const firstDataDay = daysWithData[0];
    const lastDataDay = daysWithData[daysWithData.length - 1];
    const firstValue = topMoodValues[firstDataDay].value;
    const lastValue = topMoodValues[lastDataDay].value;

    // Build data point
    const { moodAtIndex, chartData } = getChartDataPoints({
      firstDataDay,
      lastDataDay,
      firstValue,
      lastValue,
      totalDays,
      topMoodValues,
      theme,
    });

    // Build line segments colored by the destination point's mood
    const rangeStart = firstDataDay - 1;
    const rangeEnd = lastDataDay - 1;

    const segments: LineSegment[] = [];

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
    segments.push({
      startIndex: segStart,
      endIndex: rangeEnd,
      color: theme[segColor],
    });

    return { data: chartData, lineSegments: segments, hasData: true };
  }, [moods, year, month, theme]);
}
