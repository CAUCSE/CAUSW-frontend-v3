'use client';

import { BottomSheet, CTAButton, Dialog } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

import { useBreakpoint } from '@/shared/hooks';

import { AlumniContactsContactActions } from '../alumni-contacts-contact-actions';

interface AlumniContactsContactBottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isPhoneNumberVisible: GetAlumniContactsDetailResponseDto['isPhoneNumberVisible'];
  phoneNumber: GetAlumniContactsDetailResponseDto['phoneNumber'];
  email: GetAlumniContactsDetailResponseDto['email'];
}

export const AlumniContactsContactBottomSheet = ({
  open,
  onOpenChange,
  isPhoneNumberVisible,
  phoneNumber,
  email,
}: AlumniContactsContactBottomSheetProps) => {
  const { isMobileSize } = useBreakpoint();

  if (isMobileSize) {
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheet.Content
          className="items-center p-4"
          aria-describedby={undefined}
        >
          <BottomSheet.Header title="연락처 선택" className="sr-only" />
          <BottomSheet.Body className="w-full">
            <AlumniContactsContactActions
              isPhoneNumberVisible={isPhoneNumberVisible}
              phoneNumber={phoneNumber}
              email={email}
            />
          </BottomSheet.Body>
          <BottomSheet.Footer className="mt-6">
            <CTAButton
              color="light"
              fullWidth
              onClick={() => onOpenChange(false)}
            >
              닫기
            </CTAButton>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content
        width={420}
        className="items-center gap-6 p-5"
        aria-describedby={undefined}
      >
        <Dialog.Title className="sr-only">연락처 선택</Dialog.Title>
        <AlumniContactsContactActions
          isPhoneNumberVisible={isPhoneNumberVisible}
          phoneNumber={phoneNumber}
          email={email}
        />
        <Dialog.Footer className="w-full">
          <CTAButton
            color="light"
            fullWidth
            onClick={() => onOpenChange(false)}
          >
            닫기
          </CTAButton>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
