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
      mode: 'default';
      profileImageType: DefaultProfileImageType;
    }
  | {
      mode: 'custom';
      image: File;
    };

export interface ProfileImageEditValue {
  profileImageType: UserProfileImageType;
  profileImageUrl?: string | null;
  customImageFile?: File | null;
}
