'use client';

import { Text, VStack } from '@causw/cds';

export const SignUpAccountStepHeader = () => {
  return (
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
  );
};
