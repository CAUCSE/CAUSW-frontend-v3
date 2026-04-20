import { type AccountAcademicStatus } from '../../model/types';

export const ACCOUNT_ACADEMIC_STATUS_LABEL: Record<
  AccountAcademicStatus,
  string
> = {
  ENROLLED: '재학',
  LEAVE_OF_ABSENCE: '휴학',
  GRADUATED: '졸업',
  DROPPED_OUT: '자퇴',
  SUSPEND: '정지',
  EXPEL: '제적',
  PROFESSOR: '교수',
  UNDETERMINED: '미정',
};
