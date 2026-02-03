import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCloudSun, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const daytimeIcons: Record<string, IconProp> = {
  morning: faSun as IconProp,
  afternoon: faCloudSun as IconProp,
  evening: faMoon as IconProp,
  night: faMoon as IconProp,
};
