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
