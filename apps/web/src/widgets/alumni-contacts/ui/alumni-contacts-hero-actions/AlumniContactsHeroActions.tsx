'use client';

import { useRouter } from 'next/navigation';

import { Grid } from '@causw/cds';

import { AlumniContactsContactActionButton } from '@/features/alumni-contacts';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

import {
  useAlumniContactsContactBottomSheet,
  useAlumniContactsShare,
} from '../../model';
import { AlumniContactsContactBottomSheet } from '../alumni-contacts-contact-bottom-sheet';

interface AlumniContactsHeroActionsProps {
  alumniContactsId: GetAlumniContactsDetailResponseDto['id'];
  name: GetAlumniContactsDetailResponseDto['name'];
  isCoffeeChatAvailable: GetAlumniContactsDetailResponseDto['isCoffeeChatAvailable'];
  isPhoneNumberVisible: GetAlumniContactsDetailResponseDto['isPhoneNumberVisible'];
  phoneNumber: GetAlumniContactsDetailResponseDto['phoneNumber'];
  email: GetAlumniContactsDetailResponseDto['email'];
  isMine?: boolean;
}

export const AlumniContactsHeroActions = ({
  alumniContactsId,
  name,
  isCoffeeChatAvailable,
  isPhoneNumberVisible,
  phoneNumber,
  email,
  isMine = false,
}: AlumniContactsHeroActionsProps) => {
  const router = useRouter();
  const { handleClickShare } = useAlumniContactsShare(alumniContactsId, name);
  const {
    isOpen: isContactBottomSheetOpen,
    setIsOpen: setIsContactBottomSheetOpen,
    handleClickContact,
    handleClickCoffeeChat,
  } = useAlumniContactsContactBottomSheet();

  if (isMine) {
    return (
      <Grid columns={2} gap="xs" className="w-full overflow-x-auto">
        <AlumniContactsContactActionButton
          label="프로필 편집"
          onClick={() => router.push('/profile/edit')}
        />
        <AlumniContactsContactActionButton
          label="프로필 공유"
          onClick={handleClickShare}
        />
      </Grid>
    );
  }

  return (
    <>
      <Grid
        columns={isCoffeeChatAvailable ? 3 : 2}
        gap="xs"
        className="w-full overflow-x-auto"
      >
        {isCoffeeChatAvailable && (
          <AlumniContactsContactActionButton
            label="커피챗"
            onClick={handleClickCoffeeChat}
            color="dark"
            textColor="white"
          />
        )}
        <AlumniContactsContactActionButton
          label="연락하기"
          onClick={handleClickContact}
        />
        <AlumniContactsContactActionButton
          label="프로필 공유"
          onClick={handleClickShare}
        />
      </Grid>
      <AlumniContactsContactBottomSheet
        open={isContactBottomSheetOpen}
        onOpenChange={setIsContactBottomSheetOpen}
        isPhoneNumberVisible={isPhoneNumberVisible}
        phoneNumber={phoneNumber}
        email={email}
      />
    </>
  );
};
