'use client';

import { useForm, FormProvider } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Text, CTAButton, Flex, VStack, Separator } from '@causw/cds';

import { AuthContainer } from '@/widgets/auth';

import { useSignInMutation } from '@/features/auth';

import { SigninRequestDto, signInSchema } from '@/entities/auth';

import { toast } from '@/shared/model';
import { TokenManager } from '@/shared/storage';
import { RHFInput } from '@/shared/ui';
import { extractErrorMessage } from '@/shared/utils';

export const EmailLoginPage = () => {
  const router = useRouter();
  const methods = useForm<SigninRequestDto>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signInMutation = useSignInMutation({
    onSuccess: (res) => {
      toast.success('로그인에 성공했습니다.');
      TokenManager.setAccessToken(res.accessToken);
      TokenManager.setRefreshToken();
      // TODO: 현재 인증 상태에 따른 redirect 로직 추가
      router.push('/home');
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, '로그인에 실패했습니다.'));
    },
  });

  const onSubmit = (data: SigninRequestDto) => {
    console.log('Sign In Data:', data);
    signInMutation.mutate(data);
  };

  return (
    <AuthContainer>
      <FormProvider {...methods}>
        <VStack
          as="form"
          className="w-full gap-7"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <VStack justify="center" className="w-full">
            <Text
              as="h1"
              typography="title-22-bold"
              textColor="gray-800"
              className="whitespace-pre-wrap"
            >
              이메일로 시작하기
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

          {/* <Checkbox className="w-fit" {...methods.register('rememberMe')}>
            <Checkbox.Indicator />
            <Checkbox.Label
              as="span"
              typography="body-15-semibold"
              textColor="gray-700"
            >
              로그인 상태 유지
            </Checkbox.Label>
          </Checkbox> */}

          <CTAButton color="dark" fullWidth type="submit">
            로그인
          </CTAButton>

          <Flex justify="center" className="w-full">
            <Link href="/auth/find-id">
              <Text typography="body-15-semibold" textColor="gray-700">
                아이디/비번 찾기
              </Text>
            </Link>
            <Separator orientation="vertical" className="gray-300" />
            <Link href="/auth/sign-up">
              <Text typography="body-15-semibold" textColor="gray-700">
                회원가입
              </Text>
            </Link>
          </Flex>
        </VStack>
      </FormProvider>
    </AuthContainer>
  );
};
