import Link from 'next/link';

import { Text } from '@causw/cds';

import { ALUMNI_CONTACTS_SNS_TYPE_LABEL } from '../../config';
import { getAlumniContactSnsType } from '../../lib';
import { type GetAlumniContactsDetailResponseDto } from '../../model';
import { AlumniContactsSnsIcon } from '../alumni-contacts-sns-icon';

interface AlumniContactsSnsLinkProps {
  socialLink: GetAlumniContactsDetailResponseDto['socialLinks'][number];
}

export const AlumniContactsSnsLink = ({
  socialLink,
}: AlumniContactsSnsLinkProps) => {
  const snsType = getAlumniContactSnsType(socialLink);

  return (
    <Link
      href={socialLink}
      target="_blank"
      className="flex flex-col items-center gap-1.5"
    >
      <div className="flex size-15 items-center justify-center rounded-xl bg-gray-100">
        <AlumniContactsSnsIcon snsType={snsType} />
      </div>
      <Text typography="body-14-regular" textColor="gray-600">
        {ALUMNI_CONTACTS_SNS_TYPE_LABEL[snsType]}
      </Text>
    </Link>
  );
};
