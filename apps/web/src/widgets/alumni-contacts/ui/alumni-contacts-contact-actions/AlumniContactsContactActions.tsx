'use client';

import { Call, HStack, Mail, Message } from '@causw/cds';

import { AlumniContactsContactActionItem } from '@/features/alumni-contacts';

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
    <HStack gap="lg" justify="center" className="w-full overflow-x-auto">
      {isPhoneNumberVisible && (
        <>
          <AlumniContactsContactActionItem
            icon={<Call size={20} color="gray-600" />}
            label="전화"
            onClick={() => handleClickContactActionButton(call, phoneNumber)}
          />
          <AlumniContactsContactActionItem
            icon={<Message size={20} color="gray-600" />}
            label="메시지"
            onClick={() => handleClickContactActionButton(message, phoneNumber)}
          />
        </>
      )}
      <AlumniContactsContactActionItem
        icon={<Mail size={20} color="gray-600" />}
        label="이메일"
        onClick={() => handleClickContactActionButton(emailType, email)}
      />
    </HStack>
  );
};
