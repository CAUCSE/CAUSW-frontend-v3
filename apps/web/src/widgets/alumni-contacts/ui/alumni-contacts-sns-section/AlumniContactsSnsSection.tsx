import { HStack } from '@causw/cds';

import {
  AlumniContactsSnsItem,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

interface AlumniContactsSnsSectionProps {
  socialLinks: GetAlumniContactsDetailResponseDto['socialLinks'];
}

export const AlumniContactsSnsSection = ({
  socialLinks,
}: AlumniContactsSnsSectionProps) => {
  return (
    <HStack gap="xl" className="overflow-x-auto">
      {socialLinks.map((socialLink) => (
        <AlumniContactsSnsItem key={socialLink} socialLink={socialLink} />
      ))}
    </HStack>
  );
};
