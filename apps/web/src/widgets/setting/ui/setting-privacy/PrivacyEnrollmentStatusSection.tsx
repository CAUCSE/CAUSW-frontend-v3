import { Button, Flex, Text, VStack } from '@causw/cds';

import {
  ACCOUNT_ACADEMIC_STATUS_LABEL,
  type AccountAcademicStatus,
} from '@/entities/user';

interface PrivacyEnrollmentStatusSectionProps {
  academicStatus: AccountAcademicStatus;
  onChangeStatus: () => void;
}

export const PrivacyEnrollmentStatusSection = ({
  academicStatus,
  onChangeStatus,
}: PrivacyEnrollmentStatusSectionProps) => (
  <VStack className="gap-5 rounded-2xl bg-white p-5">
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        학적 상태
      </Text>
      <Flex align="center" gap="sm">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {ACCOUNT_ACADEMIC_STATUS_LABEL[academicStatus]}
        </Text>
        <Button size="sm" onClick={onChangeStatus}>
          변경
        </Button>
      </Flex>
    </Flex>
  </VStack>
);
