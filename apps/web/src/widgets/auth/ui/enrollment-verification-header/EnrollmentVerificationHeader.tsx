import { Text, VStack } from '@causw/cds';

export const EnrollmentVerificationHeader = () => {
  return (
    <VStack justify="center" className="w-full gap-2">
      <Text
        as="h1"
        typography="title-22-bold"
        textColor="gray-800"
        className="whitespace-pre-wrap"
      >
        {'재학정보 인증하기 '}
      </Text>
      <Text
        typography="body-18-medium"
        textColor="gray-600"
        className="leading-relaxed whitespace-pre-wrap"
      >
        서비스를 계속해서 이용하려면{'\n'}
        <Text typography="subtitle-18-bold" textColor="blue-700">
          재학정보
        </Text>
        {' 인증이 필요해요'}
      </Text>
    </VStack>
  );
};
