'use client';

import { Button, Dialog, HStack, Text } from '@causw/cds';

import {
  AlumniContactsContactVisibilityDialogTrigger,
  AlumniContactsContactVisibilityToggle,
} from '@/features/alumni-contacts';

import { useAlumniContactsContactVisibilityDialog } from '../../model';

export const AlumniContactsContactVisibilityDialog = () => {
  const {
    isOpen,
    currentVisibility,
    isPhoneNumberVisible,
    handleClickDialogTrigger,
    handleDialogOpenChange,
    handleToggleChange,
    handleClickSaveButton,
  } = useAlumniContactsContactVisibilityDialog();

  return (
    <>
      <AlumniContactsContactVisibilityDialogTrigger
        isPhoneNumberVisible={isPhoneNumberVisible}
        onClick={handleClickDialogTrigger}
      />
      <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
        <Dialog.Content className="w-80 gap-4 md:w-105">
          <Dialog.Title>
            <Text typography="subtitle-18-bold" textColor="gray-700">
              전화 번호 공개 여부
            </Text>
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            전화 번호 공개 여부를 설정합니다.
          </Dialog.Description>
          <AlumniContactsContactVisibilityToggle
            checked={currentVisibility}
            onCheckedChange={handleToggleChange}
          />
          <Dialog.Footer>
            <HStack gap="sm" className="pt-4">
              <Dialog.Close asChild>
                <Button color="gray" className="h-13 flex-1 rounded-md">
                  <Text typography="body-15-semibold" textColor="gray-600">
                    닫기
                  </Text>
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button
                  className="h-13 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800!"
                  onClick={handleClickSaveButton}
                >
                  <Text typography="body-15-semibold" textColor="white">
                    저장하기
                  </Text>
                </Button>
              </Dialog.Close>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
