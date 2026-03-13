import { AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';

export type MyProfileResponseDto = AlumniDetailResponseDto;
export type UpdateMyProfileRequestDto = Partial<AlumniDetailResponseDto>;
