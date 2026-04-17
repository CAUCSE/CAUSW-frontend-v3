import { type AlumniContactsDetail } from '@/entities/alumni-contacts';

type UserCareerDto = Omit<AlumniContactsDetail['userCareer'][number], 'id'> & {
  id?: string;
};

type UserProjectDto = Omit<
  AlumniContactsDetail['userProject'][number],
  'id'
> & { id?: string };

export interface PutMyAlumniContactsRequestDto extends Pick<
  AlumniContactsDetail,
  | 'description'
  | 'isPhoneNumberVisible'
  | 'socialLinks'
  | 'userTechStack'
  | 'userInterestTech'
  | 'userInterestDomain'
> {
  userCareer: UserCareerDto[];
  userProject: UserProjectDto[];
}
