import { type GetAlumniContactsQuery } from './query';

export type AlumniContactsScrollRestorationState = {
  alumniContactsId: string;
  query: GetAlumniContactsQuery;
};
