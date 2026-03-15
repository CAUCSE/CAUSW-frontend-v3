import { PaginationDto } from '@/shared/types';

interface GetAlumniContactsResponseDto {
  id: string;
  profileImageUrl: string;
  name: string;
  admissionYear: string;
  academicStatus: string;
  job: string;
  description: string;
}

export type GetPaginatedAlumniContactsResponseDto = PaginationDto<
  GetAlumniContactsResponseDto[]
>;

export interface UserActivity {
  id: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string;
}

export interface AlumniDetailResponseDto {
  id: string;
  profileImageUrl: string;
  name: string;
  admissionYear: string;
  academicStatus: string;
  job: string;
  description: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  email: string;
  socialLinks: string[];
  techStack: string[];
  userCareer: UserActivity[];
  userProject: UserActivity[];
  userInterestTech: string[];
  userInterestDomain: string[];
}
