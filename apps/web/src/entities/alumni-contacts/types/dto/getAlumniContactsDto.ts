import { PaginationDto } from '@/shared/types';

interface GetAlumniContactsResponseDto {
  id: string;
  profileImageUrl: string;
  name: string;
  admissionYear: string;
  academicStatus: string;
  hob: string;
  description: string;
}

export type GetPaginatedAlumniContactsResponseDto = PaginationDto<
  GetAlumniContactsResponseDto[]
>;
