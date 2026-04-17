'use client';

import { TextInput } from '@causw/cds';

import { useAlumniContactsSnsAddDialog } from '../../model';
import { AlumniContactsSingleFieldDialog } from '../alumni-contacts-single-field-dialog';

import { AlumniContactsSnsAddDialogTrigger } from './AlumniContactsSnsAddDialogTrigger';

export const AlumniContactsSnsAddDialog = () => {
  const {
    isOpen,
    newSocialLink,
    addButtonRef,
    handleClickTrigger,
    handleNewSocialLinkChange,
    handleOpenChange,
    handleEnterPress,
    handleClickAddButton,
  } = useAlumniContactsSnsAddDialog();

  return (
    <>
      <AlumniContactsSnsAddDialogTrigger onClick={handleClickTrigger} />
      <AlumniContactsSingleFieldDialog
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        title="링크 추가하기"
        canConfirm={!!newSocialLink.trim()}
        onConfirm={handleClickAddButton}
        confirmButtonRef={addButtonRef}
      >
        <TextInput
          placeholder="사이트 URL을 입력해주세요."
          className="bg-gray-100"
          onChange={handleNewSocialLinkChange}
          onKeyDown={handleEnterPress}
          value={newSocialLink}
        />
      </AlumniContactsSingleFieldDialog>
    </>
  );
};
