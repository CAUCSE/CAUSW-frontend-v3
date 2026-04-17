type ProfileImageUrl =
  | 'MALE_1'
  | 'MALE_2'
  | 'FEMALE_1'
  | 'FEMALE_2'
  | 'CUSTOM'
  | 'GHOST';

interface ProfileImageDto {
  profileImageType: ProfileImageUrl;
  profileImageUrl: string;
}

interface UserCareerResponse {
  id: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string;
}

interface UserProjectResponse {
  id: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string;
}

export interface AlumniContactsDetailDto {
  id: string;
  profileImage: ProfileImageDto;
  name: string;
  admissionYear: string;
  academicStatus: string;
  description: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  email: string;
  socialLinks: string[];
  userTechStack: string[];
  userCareer: UserCareerResponse[];
  userProject: UserProjectResponse[];
  userInterestTech: string[];
  userInterestDomain: string[];
}
