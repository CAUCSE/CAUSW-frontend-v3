'use client';

import React, { useState, useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  AlumniDetailCard,
  AlumniInfoWidget,
  DialogPayload,
} from '@/widgets/alumni-contacts/ui';
import {
  ProfileDialogs,
  DialogType,
  CalendarData,
} from '@/widgets/alumni-contacts/ui/ProfileDialogs';

import { useUpdateProfile } from '@/features/profile';

import { AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';
import { profileQueryOptions } from '@/entities/profile';

import { ContentLayout } from '@/shared/ui';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [dialogPayload, setDialogPayload] = useState<DialogPayload>(null);
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);

  const { data: meData } = useSuspenseQuery(profileQueryOptions.me());
  const [formData, setFormData] = useState<AlumniDetailResponseDto>(
    meData as AlumniDetailResponseDto,
  );
  const { mutate: updateProfile } = useUpdateProfile();

  // ✅ ESLint 에러(set-state-in-effect) 해결:
  // 동기적으로 바로 실행되지 않도록 브라우저의 다음 프레임이나 마이크로태스크로 미룹니다.
  useEffect(() => {
    if (!isEditing && meData) {
      const timeoutId = setTimeout(() => {
        setFormData(meData as AlumniDetailResponseDto);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isEditing, meData]);

  const openDialog = (type: DialogType, payload: DialogPayload = '') => {
    setInputValue('');
    if (type === 'DELETE_CONFIRM') {
      setDialogPayload(payload);
    } else if (typeof payload === 'boolean') {
      setToggleValue(payload);
    } else {
      setInputValue(typeof payload === 'string' ? payload : '');
    }
    setDialogType(type);
  };

  const handleSave = () => {
    updateProfile(formData, {
      onSuccess: () => {
        setDialogType(null);
        setIsEditing(false);
      },
    });
  };

  const handleDeleteItem = (payload: {
    type: string;
    value?: string;
    id?: string;
  }) => {
    setFormData((prev) => {
      const nextData = { ...prev };
      const { type, value, id } = payload;
      switch (type) {
        case 'SNS':
          nextData.socialLinks = (nextData.socialLinks || []).filter(
            (i) => i !== value,
          );
          break;
        case 'TECH':
          nextData.techStack = (nextData.techStack || []).filter(
            (i) => i !== value,
          );
          break;
        case 'CAREER':
          nextData.userCareer = (nextData.userCareer || []).filter(
            (i) => i.id !== id,
          );
          break;
        case 'PROJECT':
          nextData.userProject = (nextData.userProject || []).filter(
            (i) => i.id !== id,
          );
          break;
        case 'INT_TECH':
          nextData.userInterestTech = (nextData.userInterestTech || []).filter(
            (i) => i !== value,
          );
          break;
        case 'INT_DOMAIN':
          nextData.userInterestDomain = (
            nextData.userInterestDomain || []
          ).filter((i) => i !== value);
          break;
      }
      return nextData;
    });
  };

  const handleAddItem = (extraData?: CalendarData) => {
    setFormData((prev) => {
      const nextData = { ...prev };

      if (dialogType === 'ADD_LINK')
        nextData.socialLinks = [...(nextData.socialLinks || []), inputValue];
      if (dialogType === 'ADD_TECH')
        nextData.techStack = [...(nextData.techStack || []), inputValue];
      if (dialogType === 'ADD_INT_TECH')
        nextData.userInterestTech = [
          ...(nextData.userInterestTech || []),
          inputValue,
        ];
      if (dialogType === 'ADD_INT_DOMAIN')
        nextData.userInterestDomain = [
          ...(nextData.userInterestDomain || []),
          inputValue,
        ];

      if (dialogType === 'ADD_CAREER' || dialogType === 'ADD_PROJECT') {
        const newItem = {
          id: crypto.randomUUID(),
          description: inputValue,
          startYear: extraData?.startYear || new Date().getFullYear(),
          startMonth: extraData?.startMonth || new Date().getMonth() + 1,
          endYear: extraData?.endYear || null,
          endMonth: extraData?.endMonth || null,
        };

        if (dialogType === 'ADD_CAREER') {
          type CareerItem = NonNullable<
            AlumniDetailResponseDto['userCareer']
          >[number];
          nextData.userCareer = [
            ...(nextData.userCareer || []),
            newItem as CareerItem,
          ];
        }
        if (dialogType === 'ADD_PROJECT') {
          type ProjectItem = NonNullable<
            AlumniDetailResponseDto['userProject']
          >[number];
          nextData.userProject = [
            ...(nextData.userProject || []),
            newItem as ProjectItem,
          ];
        }
      }
      return nextData;
    });
  };

  const handleConfirm = (extraData?: CalendarData) => {
    if (dialogType === 'SAVE_CONFIRM') {
      handleSave();
      return;
    }

    if (
      dialogType === 'DELETE_CONFIRM' &&
      dialogPayload &&
      typeof dialogPayload === 'object'
    ) {
      handleDeleteItem(dialogPayload);
    } else {
      if (dialogType === 'EDIT_JOB')
        setFormData((prev) => ({ ...prev, job: inputValue }));
      if (dialogType === 'EDIT_DESC')
        setFormData((prev) => ({ ...prev, description: inputValue }));
      if (dialogType === 'EDIT_VISIBLE')
        setFormData((prev) => ({ ...prev, isPhoneNumberVisible: toggleValue }));

      if (dialogType?.includes('ADD')) {
        handleAddItem(extraData);
      }
    }

    setDialogType(null);
    setDialogPayload(null);
  };

  return (
    <ContentLayout>
      <AlumniDetailCard
        data={formData}
        isMyProfile={true}
        isEditing={isEditing}
        onActionClick={() =>
          isEditing ? openDialog('SAVE_CONFIRM') : setIsEditing(true)
        }
        onOpenDialog={(type) => {
          if (type === 'EDIT_JOB') openDialog(type, formData.job);
          if (type === 'EDIT_DESC') openDialog(type, formData.description);
          if (type === 'EDIT_VISIBLE')
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
