export const ENROLLMENT_VERIFICATION_ACADEMIC_STATUS = Object.freeze({
  ENROLLED: {
    label: '재적 (휴학 포함)',
    value: 'ENROLLED',
  },
  GRADUATED: {
    label: '졸업',
    value: 'GRADUATED',
  },
} as const);

export const ENROLLMENT_VERIFICATION_ACADEMIC_STATUS_OPTIONS = Object.values(
  ENROLLMENT_VERIFICATION_ACADEMIC_STATUS,
).map(({ label, value }) => ({
  label,
  value,
}));
