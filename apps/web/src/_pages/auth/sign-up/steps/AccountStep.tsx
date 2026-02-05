'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Text, Field, TextInput, CTAButton, VStack, Spacer } from '@causw/cds';

import { useBreakpoint } from '@/shared';

const accountSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    passwordConfirm: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

type AccountFormData = z.infer<typeof accountSchema>;

export const AccountStep = ({ onNext }: { onNext: () => void }) => {
  const { isMobileSize, isTabletSize, isDesktopSize } = useBreakpoint();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: AccountFormData) => {
    // Pass data to parent/next step if needed, currently just navigating
    console.log(data);
    onNext();
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
            계정
          </Text>
          을 생성해주세요.
        </Text>
      </VStack>

      <Field className="flex flex-col gap-2" error={!!errors.email}>
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          이메일
        </Field.Label>
        <TextInput
          placeholder="이메일을 입력해주세요."
          typography="body-16-regular"
          {...register('email')}
          error={!!errors.email}
        />
        <Field.ErrorDescription>{errors.email?.message}</Field.ErrorDescription>
      </Field>

      <Field className="flex flex-col gap-2" error={!!errors.password}>
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          비밀번호
        </Field.Label>
        <TextInput
          type="password"
          placeholder="비밀번호를 입력해주세요."
          typography="body-16-regular"
          {...register('password')}
          error={!!errors.password}
        />
        <Field.ErrorDescription>
          {errors.password?.message}
        </Field.ErrorDescription>
      </Field>

      <Field className="flex flex-col gap-2" error={!!errors.passwordConfirm}>
        <Field.Label typography="subtitle-16-bold" textColor="gray-700">
          비밀번호 확인
        </Field.Label>
        <TextInput
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          typography="body-16-regular"
          {...register('passwordConfirm')}
          error={!!errors.passwordConfirm}
        />
        <Field.ErrorDescription>
          {errors.passwordConfirm?.message}
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
