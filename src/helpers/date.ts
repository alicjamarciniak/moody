import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSun, faCloudSun, faMoon } from '@fortawesome/free-solid-svg-icons';

type DayTime = 'morning' | 'afternoon' | 'evening';

export const getToday = () => new Date();
export const copyDate = (date: Date) => new Date(date.getTime());

export const isToday = (date: Date) =>
  getToday().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0);

export const isYesterday = (date: Date) => {
  const today = getToday();
  return today.setDate(today.getDate() - 1) == date.getDate();
};

export const getDayTime = (hour: number): DayTime => {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};

export function getWeekdayKey(dayIndex: number): string {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return days[dayIndex];
}

export const getDayTimeIcon = (hour: number): IconProp => {
  const dayTime = getDayTime(hour);
  return { morning: faSun, afternoon: faCloudSun, evening: faMoon }[
    dayTime || 'afternoon'
  ] as IconProp;
};

export const gateDateStr = (date: Date) =>
  date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const getTimeStr = (date: Date) => {
  const hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minutes}`;
};

export function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
