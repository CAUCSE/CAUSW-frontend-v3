import { Button, VStack } from '@causw/cds';

import { PrivacyInfoRow } from './PrivacyInfoRow';

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
    <PrivacyInfoRow label="이름" value={name} />
    <PrivacyInfoRow label="이메일" value={email} />
    <PrivacyInfoRow
      label="전화번호"
      value={phoneNumber ?? '-'}
      action={
        <Button
          size="sm"
          onClick={onChangePhoneNumber}
          aria-label="전화번호 변경"
        >
          변경
        </Button>
      }
    />
  </VStack>
);
