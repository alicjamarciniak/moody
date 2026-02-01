import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { useTheme } from '../context/ThemeContext';
import { useMoods } from '../hooks/useMoods';

type Tab = 'month' | 'year';

export default function OversightScreen() {
  const { t, i18n } = useTranslation();
  const { isDark } = useTheme();
  const { moods } = useMoods();
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

  const textColor = isDark ? '#f3f4f6' : '#1f2937';
  const inactiveColor = isDark ? '#6b7280' : '#9ca3af';
  const activeBg = isDark ? '#374151' : '#e5e7eb';

  return (
    <SafeAreaView className="flex-1 bg-gray-100 dark:bg-gray-900">
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
        style={{ backgroundColor: isDark ? '#1f2937' : '#f3f4f6' }}
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
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
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
                  color={isDark ? '#6b7280' : '#9ca3af'}
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
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-400 dark:text-gray-500">
              {t('oversight.year')}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
