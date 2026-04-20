'use client';

import { Call, HStack, Mail, Message } from '@causw/cds';

import { AlumniContactsContactActionButton } from '@/features/alumni-contacts';

import {
  ALUMNI_CONTACTS_CONTACT_ACTION_TYPE,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { useAlumniContactsContactAction } from '../../model';

interface AlumniContactsContactActionsProps {
  isPhoneNumberVisible: GetAlumniContactsDetailResponseDto['isPhoneNumberVisible'];
  phoneNumber: GetAlumniContactsDetailResponseDto['phoneNumber'];
  email: GetAlumniContactsDetailResponseDto['email'];
}

export const AlumniContactsContactActions = ({
  isPhoneNumberVisible,
  phoneNumber,
  email,
}: AlumniContactsContactActionsProps) => {
  const { handleClickContactActionButton } = useAlumniContactsContactAction();

  const {
    call,
    message,
    email: emailType,
  } = ALUMNI_CONTACTS_CONTACT_ACTION_TYPE;

  return (
    <HStack gap="sm" className="w-full overflow-x-auto">
      {isPhoneNumberVisible && (
        <>
          <AlumniContactsContactActionButton
            icon={<Call size={16} />}
            label="전화"
            onClick={() => handleClickContactActionButton(call, phoneNumber)}
          />
          <AlumniContactsContactActionButton
            icon={<Message size={16} />}
            label="문자"
            onClick={() => handleClickContactActionButton(message, phoneNumber)}
          />
        </>
      )}
      <AlumniContactsContactActionButton
        icon={<Mail size={16} />}
        label={email}
        onClick={() => handleClickContactActionButton(emailType, email)}
      />
    </HStack>
  );
};
