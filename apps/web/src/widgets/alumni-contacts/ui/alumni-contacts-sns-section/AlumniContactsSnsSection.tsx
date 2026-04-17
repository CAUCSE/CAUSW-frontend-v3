import { HStack } from '@causw/cds';

import {
  ALUMNI_CONTACTS_SNS_TYPE,
  AlumniContactsSnsLink,
  getAlumniContactSnsType,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';
import { AlumniContactsEtcLinkConfirmDialog } from '../alumni-contacts-etc-link-confirm-dialog';

interface AlumniContactsSnsSectionProps {
  socialLinks: GetAlumniContactsDetailResponseDto['socialLinks'];
}

export const AlumniContactsSnsSection = ({
  socialLinks,
}: AlumniContactsSnsSectionProps) => {
  if (socialLinks.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }

  return (
    <HStack gap="sm" className="overflow-x-auto">
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
