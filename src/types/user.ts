import { ImageSourcePropType } from 'react-native';

export const AVATARS = [
  'bear',
  'lion',
  'otter',
  'panda',
  'sea-lion',
  'turtle',
] as const;

export type AvatarKey = (typeof AVATARS)[number];

export const AVATAR_IMAGES: Record<AvatarKey, ImageSourcePropType> = {
  bear: require('../../assets/avatars/user-bear.png'),
  lion: require('../../assets/avatars/user-lion.png'),
  otter: require('../../assets/avatars/user-otter.png'),
  panda: require('../../assets/avatars/user-panda.png'),
  'sea-lion': require('../../assets/avatars/user-sea-lion.png'),
  turtle: require('../../assets/avatars/user-turtle.png'),
};

export interface UserProfile {
  id: string;
  avatar: AvatarKey;
  displayName: string;
}
