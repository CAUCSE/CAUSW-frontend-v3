import type { PROFILE_IMAGE_ACTION_MODE } from '@/shared/constants';

export type UserProfileImageType =
  | 'MALE_1'
  | 'MALE_2'
  | 'FEMALE_1'
  | 'FEMALE_2'
  | 'CUSTOM'
  | 'GHOST';

export type DefaultProfileImageType = Extract<
  UserProfileImageType,
  'MALE_1' | 'MALE_2' | 'FEMALE_1' | 'FEMALE_2'
>;

export interface ChangeDefaultProfileImageRequest {
  profileImageType: DefaultProfileImageType;
}

export type ChangeMyProfileImageRequest =
  | {
      mode: (typeof PROFILE_IMAGE_ACTION_MODE)['DEFAULT'];
      profileImageType: DefaultProfileImageType;
    }
  | {
      mode: (typeof PROFILE_IMAGE_ACTION_MODE)['CUSTOM'];
      image: File;
    };

export interface ProfileImageEditValue {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  customImageFile?: File | null;
}

export interface ProfileImageValue {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
}
