import { HStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  AlumniContactsSnsLink,
  getAlumniContactSnsType,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsEtcLinkConfirmDialog } from '../alumni-contacts-etc-link-confirm-dialog';

interface AlumniContactsSnsSectionProps {
  socialLinks: GetAlumniContactsDetailResponseDto['socialLinks'];
}

export const AlumniContactsSnsSection = ({
  socialLinks,
}: AlumniContactsSnsSectionProps) => {
  return (
    <HStack gap="xl" className="overflow-x-auto">
      {socialLinks.map((socialLink) => {
        const snsType = getAlumniContactSnsType(socialLink);

        if (snsType === ALUMNI_CONTACTS_SNS_TYPE.ETC) {
          return (
            <AlumniContactsEtcLinkConfirmDialog
              key={socialLink}
              socialLink={socialLink}
            />
          );
        }
        return (
          <AlumniContactsSnsLink key={socialLink} socialLink={socialLink} />
        );
      })}
    </HStack>
  );
};
