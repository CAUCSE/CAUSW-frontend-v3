export interface SignupRequestDto {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  nickname: string;
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

/** SigninResponseDto와 동일한 구조를 공유하되, 추후 필드 확장을 위해 분리 */
export interface GoogleLoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}
