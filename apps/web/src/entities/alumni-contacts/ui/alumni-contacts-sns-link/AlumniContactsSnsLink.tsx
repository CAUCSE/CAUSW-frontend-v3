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
      className="flex w-16 shrink-0 flex-col items-center gap-1.5"
    >
      <div className="flex size-12.5 items-center justify-center rounded-md bg-gray-100">
        <AlumniContactsSnsIcon snsType={snsType} />
      </div>
      <Text
        typography="caption-12-regular"
        textColor="gray-600"
        className="block w-full min-w-0 truncate text-center"
      >
        {ALUMNI_CONTACTS_SNS_TYPE_LABEL[snsType]}
      </Text>
    </Link>
  );
};
