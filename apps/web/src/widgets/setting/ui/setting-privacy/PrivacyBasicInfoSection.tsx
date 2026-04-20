import { Button, Flex, Text, VStack } from '@causw/cds';

interface PrivacyBasicInfoSectionProps {
  name: string;
  email: string;
  phoneNumber: string | null;
  onChangePhoneNumber: () => void;
}

export const PrivacyBasicInfoSection = ({
  name,
  email,
  phoneNumber,
  onChangePhoneNumber,
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
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        전화번호
      </Text>
      <Flex align="center" gap="sm">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {phoneNumber ?? '-'}
        </Text>
        <Button size="sm" onClick={onChangePhoneNumber}>
          변경
        </Button>
      </Flex>
    </Flex>
  </VStack>
);
