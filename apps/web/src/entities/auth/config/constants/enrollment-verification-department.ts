export const ENROLLMENT_VERIFICATION_DEPARTMENT = Object.freeze({
  DEPT_OF_CS: {
    label: '전산학과',
    value: 'DEPT_OF_CS',
  },
  DEPT_OF_CSE: {
    label: '컴퓨터공학과',
    value: 'DEPT_OF_CSE',
  },
  SCHOOL_OF_CSE: {
    label: '컴퓨터공학부',
    value: 'SCHOOL_OF_CSE',
  },
  SCHOOL_OF_SW: {
    label: '소프트웨어학부',
    value: 'SCHOOL_OF_SW',
  },
  DEPT_OF_AI: {
    label: 'AI학과',
    value: 'DEPT_OF_AI',
  },
} as const);

export const ENROLLMENT_VERIFICATION_DEPARTMENT_OPTIONS = Object.values(
  ENROLLMENT_VERIFICATION_DEPARTMENT,
).map(({ label, value }) => ({
  label,
  value,
}));
