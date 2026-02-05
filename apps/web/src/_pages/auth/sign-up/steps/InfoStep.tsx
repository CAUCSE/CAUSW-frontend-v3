'use client';

import { useState } from 'react';

import { Text, Field, TextInput, CTAButton, VStack, Spacer } from '@causw/cds';

import { useBreakpoint } from '@/shared';

// Define localized props type if needed or reuse shared type
type AddInfoFormData = {
  name?: string;
  studentId?: string;
  nickname?: string;
};

export const InfoStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();
  const [localData, setLocalData] = useState<AddInfoFormData>({});

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
            계정 정보
          </Text>
          를 입력해주세요.
        </Text>
      </VStack>

      <Field className="flex flex-col gap-2">
        <Field.Label>이름 (본명)</Field.Label>
        <TextInput
          placeholder="이름을 입력해주세요."
          typography="body-16-regular"
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, name: e.target.value }))
          }
          defaultValue={localData.name}
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Field.Label>학번</Field.Label>
        <TextInput
          placeholder="학번을 입력해주세요."
          typography="body-16-regular"
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, studentId: e.target.value }))
          }
          defaultValue={localData.studentId}
        />
      </Field>

      <Field className="flex flex-col gap-2">
        <Field.Label>닉네임</Field.Label>
        <TextInput
          placeholder="닉네임을 입력해주세요."
          typography="body-16-regular"
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, nickname: e.target.value }))
          }
          defaultValue={localData.nickname}
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
