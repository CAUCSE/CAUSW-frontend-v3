'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Text, Field, TextInput, CTAButton, VStack, Spacer } from '@causw/cds';

import { useBreakpoint } from '@/shared';

const infoSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phoneNumber: z
    .string()
    .min(11, '올바른 전화번호 형식이 아닙니다.')
    .max(13, '올바른 전화번호 형식이 아닙니다.')
    .regex(/^010-\d{4}-\d{4}$/, '010-XXXX-XXXX 형식이어야 합니다.'),
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
});

type InfoFormData = z.infer<typeof infoSchema>;

export const InfoStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: InfoFormData) => {
    console.log(data);
    onNext();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    let formattedValue = '';

    if (value.length <= 3) {
      formattedValue = value;
    } else if (value.length <= 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setValue('phoneNumber', formattedValue, { shouldValidate: true });
  };

  return (
    <VStack
      as="form"
      className="w-full gap-7"
      onSubmit={handleSubmit(onSubmit)}
    >
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

      <Field className="flex flex-col gap-2" error={!!errors.name}>
        <Field.Label>이름 (본명)</Field.Label>
        <TextInput
          placeholder="이름을 입력해주세요."
          typography="body-16-regular"
          {...register('name')}
          error={!!errors.name}
        />
        <Field.ErrorDescription>{errors.name?.message}</Field.ErrorDescription>
      </Field>

      <Field className="flex flex-col gap-2" error={!!errors.phoneNumber}>
        <Field.Label>연락처</Field.Label>
        <TextInput
          placeholder="연락처를 입력해주세요. (010-XXXX-XXXX)"
          typography="body-16-regular"
          maxLength={13}
          {...register('phoneNumber', {
            onChange: handlePhoneNumberChange,
          })}
          error={!!errors.phoneNumber}
        />
        <Field.ErrorDescription>
          {errors.phoneNumber?.message}
        </Field.ErrorDescription>
      </Field>

      <Field className="flex flex-col gap-2" error={!!errors.nickname}>
        <Field.Label>닉네임</Field.Label>
        <TextInput
          placeholder="닉네임을 입력해주세요."
          typography="body-16-regular"
          {...register('nickname')}
          error={!!errors.nickname}
        />
        <Field.ErrorDescription>
          {errors.nickname?.message}
        </Field.ErrorDescription>
      </Field>

      {!isDesktopSize && !isTabletSize && !isMobileSize && <Spacer size={10} />}
      {isMobileSize && <Spacer size={16} />}
      {isTabletSize && <Spacer size={10} />}
      {isDesktopSize && <Spacer size={10} />}

      <CTAButton color="dark" fullWidth type="submit">
        다음
      </CTAButton>
    </VStack>
  );
};
