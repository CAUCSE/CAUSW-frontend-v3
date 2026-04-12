import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

interface AlumniContactsInterestDomainSectionProps {
  userInterestDomain: GetAlumniContactsDetailResponseDto['userInterestDomain'];
}
export const AlumniContactsInterestDomainSection = ({
  userInterestDomain,
}: AlumniContactsInterestDomainSectionProps) => {
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
