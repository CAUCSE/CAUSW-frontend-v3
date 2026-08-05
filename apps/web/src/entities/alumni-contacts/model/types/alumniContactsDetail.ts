import { type UserProfileImageType } from '@/shared/types';

interface ProfileImage {
  profileImageType: UserProfileImageType;
  profileImageUrl: string;
}

interface UserCareer {
  id: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string;
}

interface UserProject {
  id: string;
  startYear: number;
  startMonth: number;
  endYear: number | null;
  endMonth: number | null;
  description: string;
}

export interface AlumniContactsDetail {
  id: string;
  profileImage: ProfileImage;
  name: string;
  admissionYear: string;
  academicStatus: string;
  departmentDescription: string;
  description: string | null;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  isCoffeeChatAvailable: boolean;
  email: string;
  socialLinks: string[];
  userTechStack: string[];
  userCareer: UserCareer[];
  userProject: UserProject[];
  userInterestTech: string[];
  userInterestDomain: string[];
}
