export const authQueryKey = {
  all: ['auth'] as const,
  me: () => [...authQueryKey.all, 'me'] as const,
  admissionState: () => [...authQueryKey.all, 'admission-state'] as const,
  checkPhoneDuplicate: (phoneNumber: string) =>
    [...authQueryKey.all, 'check-phone-duplicate', phoneNumber] as const,
  checkNicknameDuplicate: (nickname: string) =>
    [...authQueryKey.all, 'check-nickname-duplicate', nickname] as const,
};
