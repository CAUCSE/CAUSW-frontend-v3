export const authQueryKey = {
  all: ['auth'] as const,
  checkPhoneDuplicate: (phoneNumber: string) =>
    [...authQueryKey.all, 'check-phone-duplicate', phoneNumber] as const,
  checkNicknameDuplicate: (nickname: string) =>
    [...authQueryKey.all, 'check-nickname-duplicate', nickname] as const,
};
