import { type UserProfileImageType } from '@/shared/types';

import { type AlumniContactsSectionType } from '../../../config';

interface ProfileImage {
  profileImageType: UserProfileImageType;
  profileImageUrl: string;
}

export interface AlumniSummaryDto {
  id: string;
  profileImage: ProfileImage | null;
  name: string | null;
  admissionYear: string | null;
  academicStatus: string;
  description: string | null;
  isCoffeeChatAvailable: boolean;
}

export interface AlumniDirectorySectionDto {
  type: AlumniContactsSectionType;
  items: AlumniSummaryDto[];
  hasNext: boolean;
}

export interface GetAlumniDirectoryResponseDto {
  myProfile: AlumniSummaryDto | null;
  sections: AlumniDirectorySectionDto[];
  nextCursor: string | null;
}
