export type ProfileImageType =
  | 'MALE_1'
  | 'MALE_2'
  | 'FEMALE_1'
  | 'FEMALE_2'
  | 'CUSTOM'
  | 'GHOST';

export interface ProfileImageDto {
  profileImageType: ProfileImageType;
  profileImageUrl: string | null;
}

export type AccountAcademicStatus = 'ENROLLED' | 'GRADUATED';

export type AccountOnboardingStatus =
  | 'TERMS_REQUIRED'
  | 'GUEST'
  | 'ACADEMIC_CERTIFICATION_REQUIRED'
  | 'ACTIVE';

export type AccountDepartment =
  | 'DEPT_OF_AI'
  | 'SCHOOL_OF_SW'
  | 'SCHOOL_OF_CSE'
  | 'DEPT_OF_CSE'
  | 'DEPT_OF_CS';

export interface UserMeAccountResponse {
  id: string;
  email: string;
  name: string;
  nickname: string;
  profileImage: ProfileImageDto;
  admissionYear: number;
  graduationYear: number | null;
  job: string | null;
  onboardingStatus: AccountOnboardingStatus;
  academicStatus: AccountAcademicStatus;
  phoneNumber: string | null;
  studentId: string | null;
  department: AccountDepartment | null;
}
