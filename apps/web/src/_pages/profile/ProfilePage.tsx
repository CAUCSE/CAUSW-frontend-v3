'use client';

import React from 'react';

import {
  AlumniDetailCard,
  AlumniInfoWidget,
  ProfileDialogs,
  DialogType,
} from '@/widgets/alumni-contacts';
import { PROFILE_DIALOG, useProfilePage } from '@/widgets/profile';

import { ContentLayout } from '@/shared/ui';

export default function ProfilePage() {
  const {
    isEditing,
    setIsEditing,
    dialogType,
    setDialogType,
    inputValue,
    setInputValue,
    toggleValue,
    setToggleValue,
    formData,
    openDialog,
    handleConfirm,
  } = useProfilePage();

  return (
    <ContentLayout>
      <AlumniDetailCard
        data={formData}
        isMyProfile={true}
        isEditing={isEditing}
        onActionClick={() =>
          isEditing ? openDialog(PROFILE_DIALOG.SAVE) : setIsEditing(true)
        }
        onOpenDialog={(type) => {
          if (type === PROFILE_DIALOG.EDIT_JOB) openDialog(type, formData.job);
          if (type === PROFILE_DIALOG.EDIT_DESC)
            openDialog(type, formData.description);
          if (type === PROFILE_DIALOG.EDIT_VISIBLE)
            openDialog(type, formData.isPhoneNumberVisible ?? true);
        }}
      />

      <AlumniInfoWidget
        data={formData}
        isEditing={isEditing}
        onOpenDialog={(type, payload) =>
          openDialog(type as DialogType, payload)
        }
      />

      <ProfileDialogs
        isOpen={dialogType !== null}
        dialogType={dialogType}
        inputValue={inputValue}
        setInputValue={setInputValue}
        toggleValue={toggleValue}
        setToggleValue={setToggleValue}
        onClose={() => setDialogType(null)}
        onConfirm={handleConfirm}
      />
    </ContentLayout>
  );
}
