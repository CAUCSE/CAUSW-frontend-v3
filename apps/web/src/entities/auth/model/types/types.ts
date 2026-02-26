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

export interface KakaoLoginRequestDto {
  /** 카카오 OAuth 인가 코드 */
  code: string;
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

/** SigninResponseDto와 동일한 구조를 공유하되, 추후 필드 확장을 위해 분리 */
export interface GoogleLoginResponseDto {
  accessToken: string;
  name: string;
  email: string;
  profileImgUrl: string;
}
