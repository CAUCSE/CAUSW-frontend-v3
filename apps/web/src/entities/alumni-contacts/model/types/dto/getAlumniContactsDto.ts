import { type UserProfileImageType, type PaginationDto } from '@/shared/types';

interface ProfileImage {
  profileImageType: UserProfileImageType;
  profileImageUrl: string;
}

interface GetAlumniContactsResponseDto {
  id: string;
  profileImage: ProfileImage;
  name: string;
  admissionYear: string;
  academicStatus: string;
  description: string | null;
}

export type GetPaginatedAlumniContactsResponseDto = PaginationDto<
  GetAlumniContactsResponseDto[]
>;
