export interface SignupRequestDto {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  nickname: string;
  emailVerificationCode: string;
  agreedTermsIds: string[];
}

export interface SignupResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}

export interface SigninRequestDto {
  email: string;
  password: string;
}

export interface SigninResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}

export type OnboardingStatus =
  | 'TERMS_REQUIRED'
  | 'EMAIL_VERIFICATION_REQUIRED'
  | 'GUEST'
  | 'ACADEMIC_CERTIFICATION_REQUIRED'
  | 'ACTIVE';

export type UserProfileImageType =
  | 'MALE_1'
  | 'MALE_2'
  | 'FEMALE_1'
  | 'FEMALE_2'
  | 'CUSTOM'
  | 'GHOST';

export interface UserResponseDto {
  id: string;
  email: string;
  name: string;
  nickname: string;
  onboardingStatus: OnboardingStatus;
  profileImage: {
    profileImageType: UserProfileImageType;
    profileImageUrl: string;
  };
  admissionYear: number;
  job: string;
  academicStatus: AcademicStatus;
}

export interface SignoutRequestDto {
  fcmToken: string;
}

export interface SignoutResponseDto {
  data: string;
}

export interface SendEmailVerificationCodeRequestDto {
  email: string;
}

export interface SendEmailVerificationCodeResponseDto {
  code: string;
  message: string;
}

export interface VerifyEmailVerificationCodeRequestDto {
  email: string;
  verificationCode: string;
}

export interface VerifyEmailVerificationCodeResponseDto {
  code: string;
  message: string;
}

export interface CheckPhoneDuplicateRequestDto {
  phoneNumber: string;
}

export interface CheckNicknameDuplicateRequestDto {
  nickname: string;
}

export interface TermResponseDto {
  id: string;
  title: string;
  type: string;
  isRequired: boolean;
  version: number;
  effectiveDate: string;
  content: string;
}

export interface TermsAgreementRequestDto {
  termsIds: string[];
}

export interface KakaoLoginRequestDto {
  /** 카카오 OAuth 인가 코드 */
  code: string;
}

export interface KakaoNativeLoginRequestDto {
  /** Native SDK에서 받은 카카오 액세스 토큰 */
  accessToken: string;
}

/** SigninResponseDto와 동일한 구조를 공유하되, 추후 필드 확장을 위해 분리 */
export interface KakaoLoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}

export interface AppleLoginRequestDto {
  /** Apple OAuth 인가 코드 */
  code: string;
}

export interface AppleNativeLoginRequestDto {
  /** Native SDK에서 받은 Apple 액세스 토큰 */
  accessToken: string;
}

/** SigninResponseDto와 동일한 구조를 공유하되, 추후 필드 확장을 위해 분리 */
export interface AppleLoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}

export interface GoogleLoginRequestDto {
  /** Google OAuth 인가 코드 */
  code: string;
}

export interface GoogleNativeLoginRequestDto {
  /** Native SDK에서 받은 Google 액세스 토큰 */
  accessToken: string;
}

export type NativeSocialLoginProvider = 'kakao' | 'apple' | 'google';

export interface NativeSocialLoginRequestDto {
  provider: NativeSocialLoginProvider;
  accessToken?: string;
  idToken?: string;
}

export interface SocialLoginAdditionalInfoRequestDto {
  name: string;
  phoneNumber: string;
  nickname: string;
  agreedTermsIds: string[];
}

type AcademicStatus =
  | 'ENROLLED'
  | 'LEAVE_OF_ABSENCE'
  | 'GRADUATED'
  | 'DROPPED_OUT'
  | 'SUSPEND'
  | 'EXPEL'
  | 'PROFESSOR'
  | 'UNDETERMINED';

export interface AuthResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImage: {
    profileImageType: UserProfileImageType;
    profileImageUrl: string;
  };
  onboardingStatus: OnboardingStatus;
  academicStatus: AcademicStatus;
}

/** SigninResponseDto와 동일한 구조를 공유하되, 추후 필드 확장을 위해 분리 */
export interface GoogleLoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}

export interface FindEmailRequestDto {
  name: string;
  phoneNumber: string;
}

export type SocialProvider = 'KAKAO' | 'APPLE' | 'GOOGLE';

export interface SocialAccountSummary {
  provider: SocialProvider;
  createdAt: string;
}

export interface EmailFindResponse {
  email: string;
  createdAt: string;
  socialAccounts: SocialAccountSummary[];
}

export interface PasswordResetSendRequestDto {
  name: string;
  email: string;
}

export interface PasswordResetVerifyRequestDto {
  name: string;
  email: string;
  verificationCode: string;
}

export interface PasswordResetVerifyResponseDto {
  temporaryPassword: string;
}

export type AdmissionDepartment =
  | 'DEPT_OF_AI'
  | 'SCHOOL_OF_SW'
  | 'SCHOOL_OF_CSE'
  | 'DEPT_OF_CSE'
  | 'DEPT_OF_CS';

export type AdmissionAcademicStatus = 'ENROLLED' | 'GRADUATED';

export interface AdmissionCreateRequestPayloadDto {
  name: string;
  requestedDepartment: AdmissionDepartment;
  requestedAdmissionYear: number;
  requestedStudentId: string;
  requestedAcademicStatus: AdmissionAcademicStatus;
  graduationYear?: number;
  description?: string;
}

export interface AdmissionCreateRequestDto {
  request: AdmissionCreateRequestPayloadDto;
  attachImages: File[];
}

/**
 * 재학인증 관련 비즈니스 타입 정의
 */

/**
 * 서버에서 내려오는 재학인증 상태값
 *
 * - `AWAIT`: 제출 전 또는 심사 대기 상태
 * - `ACTIVE`: 승인 완료 상태
 * - `REJECT`: 심사 반려 상태
 */
export type EnrollmentStatus = 'AWAIT' | 'ACTIVE' | 'REJECT' | 'GUEST' | 'DROP';

export interface AdmissionStateResponseDto {
  userState: EnrollmentStatus;
  hasAdmission: boolean;
  rejectReason: string | null;
}

/**
 * 개별 스텝의 시각적 상태
 *
 * - `completed`: 완료된 스텝 (체크 아이콘 + "완료" 텍스트)
 * - `active`: 현재 활성화된 스텝 (파란색 보더 + 안내 텍스트 + 액션 버튼)
 * - `locked`: 아직 도달하지 않은 잠긴 스텝 (비활성 표시)
 */
export type StepState = 'completed' | 'active' | 'locked';

/**
 * 스텝 카드에 표시할 데이터
 */
export interface StepCardData {
  /** 스텝 번호 (1, 2, 3) */
  stepNumber: number;
  /** 스텝 제목 */
  title: string;
  /** 스텝의 시각적 상태 */
  state: StepState;
  /** 우측 상태 라벨 (예: "처리 중", "반려됨") */
  statusLabel?: string;
  /** 설명 텍스트 */
  description?: string;
  /** 설명 내 하이라이트할 텍스트 (파란색으로 표시) */
  highlightText?: string;
  /** 반려 사유 (빨간색으로 표시) */
  rejectedReason?: string;
  /** 액션 버튼 라벨 */
  buttonLabel?: string;
  /** 액션 버튼 클릭 핸들러 키 */
  action?: EnrollmentAction;
}

/**
 * 가능한 액션 타입
 */
export type EnrollmentAction = 'submit' | 'edit' | 'resubmit';
