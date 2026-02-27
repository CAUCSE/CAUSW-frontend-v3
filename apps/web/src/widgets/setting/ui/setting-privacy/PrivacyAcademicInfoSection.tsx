import { Flex, Text } from '@causw/cds';

interface PrivacyAcademicInfoSectionProps {
  studentId: string;
  major: string;
  enrollmentYear: string;
}

export const PrivacyAcademicInfoSection = ({
  studentId,
  major,
  enrollmentYear,
}: PrivacyAcademicInfoSectionProps) => (
  <div className="flex w-full flex-col gap-5 rounded-2xl bg-white p-5">
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        학번
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {studentId}
      </Text>
    </Flex>
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        학부(학과)
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {major}
      </Text>
    </Flex>
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        입학년도
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {enrollmentYear}
      </Text>
    </Flex>
  </div>
);
