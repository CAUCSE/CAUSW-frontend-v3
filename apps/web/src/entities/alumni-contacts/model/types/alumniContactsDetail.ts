type ProfileImageUrl =
  | 'MALE_1'
  | 'MALE_2'
  | 'FEMALE_1'
  | 'FEMALE_2'
  | 'CUSTOM'
  | 'GHOST';

interface ProfileImage {
  profileImageType: ProfileImageUrl;
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
  description: string;
  phoneNumber: string;
  isPhoneNumberVisible: boolean;
  email: string;
  socialLinks: string[];
  userTechStack: string[];
  userCareer: UserCareer[];
  userProject: UserProject[];
  userInterestTech: string[];
  userInterestDomain: string[];
}
