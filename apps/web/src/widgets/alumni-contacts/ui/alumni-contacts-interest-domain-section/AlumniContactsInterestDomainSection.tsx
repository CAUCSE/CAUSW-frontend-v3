import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';

interface AlumniContactsInterestDomainSectionProps {
  userInterestDomain: GetAlumniContactsDetailResponseDto['userInterestDomain'];
}
export const AlumniContactsInterestDomainSection = ({
  userInterestDomain,
}: AlumniContactsInterestDomainSectionProps) => {
  if (userInterestDomain.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }

  return (
    <HStack gap="sm" className="overflow-x-auto">
      {userInterestDomain.map((domain) => (
        <Chip key={domain} size="md" color="lightgray">
          {domain}
        </Chip>
      ))}
    </HStack>
  );
};
