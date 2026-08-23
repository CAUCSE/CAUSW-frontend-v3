export type AlumniContactsDepartmentFilterOption =
  | 'DEPT_OF_AI'
  | 'SCHOOL_OF_SW'
  | 'SCHOOL_OF_CSE'
  | 'DEPT_OF_CSE'
  | 'DEPT_OF_CS';

export const ALUMNI_CONTACTS_DEPARTMENT_FILTER_OPTION: Record<
  AlumniContactsDepartmentFilterOption,
  { label: string; value: AlumniContactsDepartmentFilterOption }
> = {
  DEPT_OF_AI: { label: 'AI학과', value: 'DEPT_OF_AI' },
  SCHOOL_OF_SW: { label: '소프트웨어학부', value: 'SCHOOL_OF_SW' },
  SCHOOL_OF_CSE: { label: '컴퓨터공학부', value: 'SCHOOL_OF_CSE' },
  DEPT_OF_CSE: { label: '컴퓨터공학과', value: 'DEPT_OF_CSE' },
  DEPT_OF_CS: { label: '전산학과', value: 'DEPT_OF_CS' },
};
