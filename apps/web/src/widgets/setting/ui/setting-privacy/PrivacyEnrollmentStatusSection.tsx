import { Button, VStack } from '@causw/cds';

import {
  ACCOUNT_ACADEMIC_STATUS_LABEL,
  type AccountAcademicStatus,
} from '@/entities/user';

import { PrivacyInfoRow } from './PrivacyInfoRow';

interface PrivacyEnrollmentStatusSectionProps {
  academicStatus: AccountAcademicStatus;
  onChangeStatus: () => void;
}

export const PrivacyEnrollmentStatusSection = ({
  academicStatus,
  onChangeStatus,
}: PrivacyEnrollmentStatusSectionProps) => (
  <VStack className="gap-5 rounded-2xl bg-white p-5">
    <PrivacyInfoRow
      label="학적 상태"
      value={ACCOUNT_ACADEMIC_STATUS_LABEL[academicStatus]}
      action={
        <Button size="sm" onClick={onChangeStatus} aria-label="학적 상태 변경">
          변경
        </Button>
      }
    />
  </VStack>
);
