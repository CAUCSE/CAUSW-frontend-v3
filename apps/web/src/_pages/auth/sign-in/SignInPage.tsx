'use client';

import Link from 'next/link';

import {
  Text,
  Field,
  TextInput,
  CTAButton,
  Flex,
  VStack,
  Checkbox,
  Separator,
} from '@causw/cds';

import { AuthContainer } from '@/widgets/auth';

export const SignInPage = () => {
  return (
    <AuthContainer>
      <VStack className="w-full gap-7">
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

        {/* Form */}
        <Field className="flex flex-col gap-2 pb-7">
          <Field.Label>이메일</Field.Label>
          <TextInput
            placeholder="이메일을 입력해주세요."
            typography="body-16-regular"
          />
        </Field>

        <Field className="flex flex-col gap-2">
          <Field.Label>비밀번호</Field.Label>
          <TextInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            typography="body-16-regular"
          />
        </Field>

        <Checkbox className="w-fit">
          <Checkbox.Indicator />
          <Checkbox.Label
            as="span"
            typography="body-15-semibold"
            textColor="gray-700"
          >
            로그인 상태 유지
          </Checkbox.Label>
        </Checkbox>
        <CTAButton color="dark" fullWidth>
          로그인
        </CTAButton>

        <Flex justify="center" className="w-full">
          <Link href="/find-id">
            <Text typography="body-15-semibold" textColor="gray-700">
              아이디/비번 찾기
            </Text>
          </Link>
          <Separator orientation="vertical" className="gray-300" />
          <Link href="/sign-up">
            <Text typography="body-15-semibold" textColor="gray-700">
              회원가입
            </Text>
          </Link>
        </Flex>
      </VStack>
    </AuthContainer>
  );
};
