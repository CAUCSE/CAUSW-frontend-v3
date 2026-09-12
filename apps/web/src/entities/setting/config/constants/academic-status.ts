export const ACADEMIC_STATE_CHANGE_STATUS = Object.freeze({
  ENROLLED: {
    label: '재학',
    value: 'ENROLLED',
  },
  GRADUATED: {
    label: '졸업',
    value: 'GRADUATED',
  },
} as const);

export const ACADEMIC_STATE_CHANGE_STATUS_OPTIONS = Object.values(
  ACADEMIC_STATE_CHANGE_STATUS,
).map(({ label, value }) => ({
  label,
  value,
}));
