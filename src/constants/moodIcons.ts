import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faFaceFrown,
  faFaceGrinStars,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons';

export const moodIcons: Record<string, IconProp> = {
  awesome: faFaceGrinStars as IconProp,
  good: faFaceSmile as IconProp,
  okay: faFaceMeh as IconProp,
  bad: faFaceFrown as IconProp,
  awful: faFaceSadTear as IconProp,
};
