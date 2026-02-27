import { Button, Flex, Text } from '@causw/cds';

interface PrivacyEnrollmentStatusSectionProps {
  enrollmentStatus: string;
  completedSemesters: number;
  paidSemesters: number;
  remainingSemesters: number;
  currentSemesterFeeApplied: boolean;
  onChangeStatus?: () => void;
}

export const PrivacyEnrollmentStatusSection = ({
  enrollmentStatus,
  completedSemesters,
  paidSemesters,
  remainingSemesters,
  currentSemesterFeeApplied,
  onChangeStatus,
}: PrivacyEnrollmentStatusSectionProps) => (
  <div className="flex w-full flex-col gap-5 rounded-2xl bg-white p-5">
    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        학적 상태
      </Text>
      <Flex align="center" gap="sm">
        <Text typography="subtitle-16-bold" textColor="gray-700">
          {enrollmentStatus}
        </Text>
        {onChangeStatus && (
          <Button size="sm" onClick={onChangeStatus}>
            변경
          </Button>
        )}
      </Flex>
    </Flex>

    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        등록 완료 학기
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {completedSemesters}
      </Text>
    </Flex>

    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        납부한 학생회비 학기 차수
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {paidSemesters}학기
      </Text>
    </Flex>

    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        남은 학생회비 차수
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {remainingSemesters}학기
      </Text>
    </Flex>

    <Flex justify="between" align="center" className="w-full">
      <Text typography="body-16-medium" textColor="gray-500">
        본 학기 학생회비 적용 여부
      </Text>
      <Text typography="subtitle-16-bold" textColor="gray-700">
        {currentSemesterFeeApplied ? 'O' : 'X'}
      </Text>
    </Flex>
  </div>
);
