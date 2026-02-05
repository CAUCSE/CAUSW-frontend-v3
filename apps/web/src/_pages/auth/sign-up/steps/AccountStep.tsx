'use client';

import { Text, Field, TextInput, CTAButton, VStack, Spacer } from '@causw/cds';

import { useBreakpoint } from '@/shared';

export const AccountStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();

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

      {/* Form Fields for Account */}
      <Field className="flex flex-col gap-2">
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          이메일
        </Field.Label>
        <TextInput
          placeholder="이메일을 입력해주세요."
          typography="body-16-regular"
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          비밀번호
        </Field.Label>
        <TextInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          typography="body-16-regular"
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          비밀번호 확인
        </Field.Label>
        <TextInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          typography="body-16-regular"
        />
      </Field>

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
