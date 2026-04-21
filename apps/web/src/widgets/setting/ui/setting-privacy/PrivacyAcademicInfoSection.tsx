import { VStack } from '@causw/cds';

import { PrivacyInfoRow } from './PrivacyInfoRow';

interface PrivacyAcademicInfoSectionProps {
  studentId: string | null;
  major: string;
  admissionYear: number;
  graduationYear: number | null;
}

export const PrivacyAcademicInfoSection = ({
  studentId,
  major,
  admissionYear,
  graduationYear,
}: PrivacyAcademicInfoSectionProps) => (
  <VStack className="gap-5 rounded-2xl bg-white p-5">
    <PrivacyInfoRow label="학번" value={studentId ?? '-'} />
    <PrivacyInfoRow label="학부(학과)" value={major} />
    <PrivacyInfoRow label="입학년도" value={admissionYear} />
    {graduationYear !== null && (
      <PrivacyInfoRow label="졸업년도" value={graduationYear} />
    )}
  </VStack>
);
