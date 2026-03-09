import { Flex, Text, VStack } from '@causw/cds';

interface PrivacyBasicInfoSectionProps {
  name: string;
  email: string;
}

export const PrivacyBasicInfoSection = ({
  name,
  email,
}: PrivacyBasicInfoSectionProps) => (
  <VStack className="gap-5 rounded-2xl bg-white p-5">
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        이름
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {name}
      </Text>
    </Flex>
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        이메일
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {email}
      </Text>
    </Flex>
  </VStack>
);
