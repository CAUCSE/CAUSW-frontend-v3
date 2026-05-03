'use client';

import { useRef } from 'react';

import { useForm, FormProvider } from 'react-hook-form';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Text, CTAButton, Flex, VStack, Separator, Checkbox } from '@causw/cds';

import { AuthContainer } from '@/widgets/auth';

import { routeAfterSignIn, useSignInMutation } from '@/features/auth';
import { usePushNotification } from '@/features/notification';

import { type SignInFormData, signInSchema } from '@/entities/auth';

import { toast } from '@/shared/model';
import { AuthOptionManager, TokenManager } from '@/shared/storage';
import { ActionHeader, DesktopOnly, MobileOnly, RHFInput } from '@/shared/ui';

export const EmailLoginPage = () => {
  const router = useRouter();
  const rememberMeRef = useRef(false);
  const methods = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });
  const { compareFCMToken } = usePushNotification();
  const signInMutation = useSignInMutation({
    onSuccess: async (res) => {
      await AuthOptionManager.setSessionPersist(rememberMeRef.current);
      await TokenManager.setAccessToken(res.accessToken);
      await TokenManager.setRefreshToken(res.refreshToken);

      routeAfterSignIn(router, res.onboardingStatus);
      void compareFCMToken();
    },
    onMutate: () => {
      toast.loading('로그인 정보 확인 중...');
    },
  });

  const onSubmit = (data: SignInFormData) => {
    rememberMeRef.current = !!data.rememberMe;
    signInMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <MobileOnly>
        <ActionHeader>
          <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
        </ActionHeader>
      </MobileOnly>

      <AuthContainer>
        <FormProvider {...methods}>
          <VStack
            as="form"
            className="w-full gap-7"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <DesktopOnly>
              <ActionHeader className="px-0">
                <ActionHeader.BackButton>뒤로</ActionHeader.BackButton>
              </ActionHeader>
            </DesktopOnly>
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

            <Checkbox
              checked={methods.watch('rememberMe') ?? false}
              onCheckedChange={(checked) => {
                methods.setValue('rememberMe', !!checked, {
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            >
              <Checkbox.Indicator />
              <Checkbox.Label
                typography="body-15-semibold"
                textColor="gray-700"
              >
                로그인 상태 유지
              </Checkbox.Label>
            </Checkbox>

            <CTAButton color="dark" fullWidth type="submit">
              로그인
            </CTAButton>

            <Flex justify="center" className="w-full">
              <Link href="/auth/find-account">
                <Text
                  typography="body-15-semibold"
                  textColor="gray-700"
                  className="hover:text-gray-500 active:text-gray-500"
                >
                  아이디/비번 찾기
                </Text>
              </Link>
              <Separator orientation="vertical" className="gray-300" />
              <Link href="/auth/sign-up">
                <Text
                  typography="body-15-semibold"
                  textColor="gray-700"
                  className="hover:text-gray-500 active:text-gray-500"
                >
                  회원가입
                </Text>
              </Link>
            </Flex>
          </VStack>
        </FormProvider>
      </AuthContainer>
    </>
  );
};
