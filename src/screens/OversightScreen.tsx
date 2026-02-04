import React, { useState, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlassChart,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useTranslation } from 'react-i18next';
import { Text } from '../components/Text';
import { MoodChart } from '../components/MoodChart';
import { MoodCountChart } from '../components/MoodCountChart';
import { StatisticsBlocks } from '../components/StatisticsBlocks';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useTheme } from '../context/ThemeContext';
import { InProgressBanner } from '../components/InProgressBanner';
import { useMoods } from '../hooks/useMoods';
import { colors } from '@/theme/colors';
import { default as tColors } from 'tailwindcss/colors';

type Tab = 'month' | 'year';

export default function OversightScreen() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const { moods, refetch } = useMoods();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<Tab>('month');

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth());
  const [scrollToEnd, setScrollToEnd] = useState(false);

  const isCurrentMonth =
    selectedYear === now.getFullYear() && selectedMonth === now.getMonth();

  const goToPrevMonth = () => {
    setScrollToEnd(true);
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (isCurrentMonth) return;
    setScrollToEnd(false);
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const locale = i18n.language === 'pl' ? 'pl-PL' : 'en-US';
  const monthLabel = new Date(selectedYear, selectedMonth).toLocaleDateString(
    locale,
    { month: 'long', year: 'numeric' }
  );

  const textColor = isDark ? colors.light : colors.darkGray;
  const inactiveColor = isDark ? colors.midGray : colors.lightGray;
  const activeBg = isDark ? tColors.gray[700] : tColors.gray[200];

  return (
    <ScreenWrapper>
      {/* Header */}
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <FontAwesomeIcon
            icon={faChevronLeft as IconProp}
            size={18}
            color={textColor}
          />
        </TouchableOpacity>
        <Text weight="bold" className="text-lg" style={{ color: textColor }}>
          {t('oversight.title')}
        </Text>
      </View>

      {/* Tabs */}
      <View
        className="flex-row mx-5 mb-4 rounded-xl overflow-hidden"
        style={{
          backgroundColor: isDark ? colors.darkGray : colors.dirtyWhite,
        }}
      >
        {(['month', 'year'] as Tab[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="flex-1 py-3 items-center rounded-xl"
            style={
              activeTab === tab ? { backgroundColor: activeBg } : undefined
            }
          >
            <Text
              weight={activeTab === tab ? 'bold' : 'medium'}
              className="text-sm"
              style={{ color: activeTab === tab ? textColor : inactiveColor }}
            >
              {t(`oversight.${tab}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {activeTab === 'month' ? (
          <View>
            {/* Month Switcher */}
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={goToPrevMonth} className="p-2">
                <FontAwesomeIcon
                  icon={faChevronLeft as IconProp}
                  size={16}
                  color={textColor}
                />
              </TouchableOpacity>
              <Text
                weight="bold"
                className="text-base capitalize"
                style={{ color: textColor }}
              >
                {monthLabel}
              </Text>
              <TouchableOpacity
                onPress={goToNextMonth}
                className="p-2"
                disabled={isCurrentMonth}
                style={{ opacity: isCurrentMonth ? 0.3 : 1 }}
              >
                <FontAwesomeIcon
                  icon={faChevronRight as IconProp}
                  size={16}
                  color={textColor}
                />
              </TouchableOpacity>
            </View>

            {/* Check if there are moods for this month */}
            {moods.filter((mood) => {
              const moodDate = new Date(mood.timestamp);
              return (
                moodDate.getFullYear() === selectedYear &&
                moodDate.getMonth() === selectedMonth
              );
            }).length === 0 ? (
              <View className="flex-1 items-center justify-center py-16">
                <FontAwesomeIcon
                  icon={faMagnifyingGlassChart as IconProp}
                  size={60}
                  color={isDark ? colors.midGray : colors.lightGray}
                />
                <Text className="text-gray-500 dark:text-gray-400 text-center mt-6">
                  {t('home.noMoods')}
                </Text>
              </View>
            ) : (
              <>
                {/* Statistics Blocks */}
                <View className="mb-4">
                  <StatisticsBlocks
                    moods={moods}
                    year={selectedYear}
                    month={selectedMonth}
                  />
                </View>

                <MoodChart
                  key={`${selectedYear}-${selectedMonth}`}
                  moods={moods}
                  year={selectedYear}
                  month={selectedMonth}
                  scrollToEnd={scrollToEnd}
                />

                {/* Mood Count Chart */}
                <View className="mt-4">
                  <MoodCountChart
                    moods={moods}
                    year={selectedYear}
                    month={selectedMonth}
                  />
                </View>
              </>
            )}
          </View>
        ) : (
          <View className="flex-1 items-center justify-center py-16">
            <InProgressBanner />
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
