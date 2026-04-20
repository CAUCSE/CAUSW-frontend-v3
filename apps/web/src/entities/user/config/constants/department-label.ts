import { type AccountDepartment } from '../../model/types';

export const ACCOUNT_DEPARTMENT_LABEL: Record<AccountDepartment, string> = {
  DEPT_OF_AI: 'AI학과',
  SCHOOL_OF_SW: '소프트웨어학부',
  SCHOOL_OF_CSE: '컴퓨터공학부',
  DEPT_OF_CSE: '컴퓨터공학과',
  DEPT_OF_CS: '전산학과',
};

export const getDepartmentLabel = (
  department: AccountDepartment | null,
): string => {
  if (!department) return '-';
  return ACCOUNT_DEPARTMENT_LABEL[department];
};
