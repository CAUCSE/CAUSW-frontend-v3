import { Text, CTAButton, VStack, Spacer } from '@causw/cds';

import { useBreakpoint, RHFInput } from '@/shared';

export const AccountStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();

  // No internal useForm, relying on parent FormProvider
  
  return (
    <VStack className="w-full gap-7">
        <VStack justify="center" className="w-full">
          <Text
            as="h1"
            typography="title-22-bold"
            textColor="gray-800"
            className="whitespace-pre-wrap"
          >
            크자회 (CCSSAA){'\n'}
            <Text typography="title-22-bold" textColor="blue-700">
              계정
            </Text>
            을 생성해주세요.
          </Text>
        </VStack>

        <RHFInput
          name="email"
          label="이메일"
          placeholder="이메일을 입력해주세요."
          typography="body-16-regular"
        />

        <RHFInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          typography="body-16-regular"
        />

        <RHFInput
          name="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          typography="body-16-regular"
        />

        {!isDesktopSize && !isTabletSize && !isMobileSize && <Spacer size={10} />}
        {isMobileSize && <Spacer size={16} />}
        {isTabletSize && <Spacer size={10} />}
        {isDesktopSize && <Spacer size={10} />}

        <CTAButton color="dark" fullWidth onClick={onNext}>
          다음
        </CTAButton>
    </VStack>
  );
};
