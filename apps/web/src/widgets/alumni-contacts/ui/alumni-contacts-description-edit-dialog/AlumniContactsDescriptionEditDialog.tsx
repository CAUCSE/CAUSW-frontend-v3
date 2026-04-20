'use client';

import { Button, Dialog, Text } from '@causw/cds';

import { AlumniContactsDescriptionTextArea } from '@/features/alumni-contacts';

import { ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH } from '@/entities/alumni-contacts';

import { useAlumniContactsDescriptionEditDialog } from '../../model';

import { AlumniContactsDescriptionEditDialogTrigger } from './AlumniContactsDescriptionEditDialogTrigger';

export const AlumniContactsDescriptionEditDialog = () => {
  const {
    description,
    currentDescription,
    textareaRef,
    handleDialogOpenChange,
    handleDescriptionChange,
    handleClickEditButton,
  } = useAlumniContactsDescriptionEditDialog();

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <AlumniContactsDescriptionEditDialogTrigger description={description} />
      <Dialog.Content className="w-80 gap-2 md:w-105">
        <Dialog.Title>
          <Text typography="subtitle-18-bold" textColor="gray-700">
            소개글 수정하기
          </Text>
        </Dialog.Title>
        <Dialog.Description className="sr-only">
          소개글을 수정합니다.
        </Dialog.Description>
        <AlumniContactsDescriptionTextArea
          value={currentDescription}
          onChange={handleDescriptionChange}
          maxLength={ALUMNI_CONTACTS_EDIT_FORM_MAX_LENGTH.DESCRIPTION}
          ref={textareaRef}
        />
        <Dialog.Footer className="flex gap-2 pt-6">
          <Dialog.Close asChild>
            <Button color="gray" className="h-13 flex-1">
              닫기
            </Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button
              className="h-13 flex-1 bg-gray-700 text-white hover:bg-gray-800!"
              onClick={handleClickEditButton}
            >
              수정하기
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};
