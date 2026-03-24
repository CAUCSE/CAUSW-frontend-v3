'use client';

import { useState, useEffect } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  DialogType,
  DialogPayload,
  CalendarData,
} from '@/widgets/alumni-contacts';

import { useUpdateProfile } from '@/features/profile';

import { AlumniDetailResponseDto } from '@/entities/alumni-contacts/types';
import { profileQueryOptions } from '@/entities/profile';

export const PROFILE_DIALOG = {
  SAVE: 'SAVE_CONFIRM',
  DELETE: 'DELETE_CONFIRM',
  EDIT_JOB: 'EDIT_JOB',
  EDIT_DESC: 'EDIT_DESC',
  EDIT_VISIBLE: 'EDIT_VISIBLE',
  ADD_LINK: 'ADD_LINK',
  ADD_TECH: 'ADD_TECH',
  ADD_CAREER: 'ADD_CAREER',
  ADD_PROJECT: 'ADD_PROJECT',
  ADD_INT_TECH: 'ADD_INT_TECH',
  ADD_INT_DOMAIN: 'ADD_INT_DOMAIN',
} as const;

export const useProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [dialogPayload, setDialogPayload] = useState<DialogPayload>(null);
  const [inputValue, setInputValue] = useState('');
  const [toggleValue, setToggleValue] = useState(false);

  const { data: meData } = useSuspenseQuery(profileQueryOptions.me());

  const [formData, setFormData] = useState<AlumniDetailResponseDto>(meData);
  const { mutate: updateProfile } = useUpdateProfile();

  useEffect(() => {
    if (!isEditing) {
      const timeoutId = setTimeout(() => {
        setFormData(meData);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isEditing, meData]);

  const openDialog = (type: DialogType, payload: DialogPayload = '') => {
    setInputValue('');
    if (type === PROFILE_DIALOG.DELETE) {
      setDialogPayload(payload);
    } else if (typeof payload === 'boolean') {
      setToggleValue(payload);
    } else {
      setInputValue(typeof payload === 'string' ? payload : '');
    }
    setDialogType(type);
  };

  const handleConfirm = (extraData?: CalendarData) => {
    if (dialogType === PROFILE_DIALOG.SAVE) {
      updateProfile(formData, {
        onSuccess: () => {
          setDialogType(null);
          setIsEditing(false);
        },
      });
      return;
    }

    setFormData((prev) => {
      const nextData = { ...prev };

      if (dialogType === PROFILE_DIALOG.EDIT_JOB) nextData.job = inputValue;
      if (dialogType === PROFILE_DIALOG.EDIT_DESC)
        nextData.description = inputValue;
      if (dialogType === PROFILE_DIALOG.EDIT_VISIBLE)
        nextData.isPhoneNumberVisible = toggleValue;

      if (
        dialogType === PROFILE_DIALOG.DELETE &&
        dialogPayload &&
        typeof dialogPayload === 'object'
      ) {
        const { type, value, id } = dialogPayload;
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
            nextData.userInterestTech = (
              nextData.userInterestTech || []
            ).filter((i) => i !== value);
            break;
          case 'INT_DOMAIN':
            nextData.userInterestDomain = (
              nextData.userInterestDomain || []
            ).filter((i) => i !== value);
            break;
        }
      }

      if (dialogType === PROFILE_DIALOG.ADD_LINK)
        nextData.socialLinks = [...(nextData.socialLinks || []), inputValue];
      if (dialogType === PROFILE_DIALOG.ADD_TECH)
        nextData.techStack = [...(nextData.techStack || []), inputValue];
      if (dialogType === PROFILE_DIALOG.ADD_INT_TECH)
        nextData.userInterestTech = [
          ...(nextData.userInterestTech || []),
          inputValue,
        ];
      if (dialogType === PROFILE_DIALOG.ADD_INT_DOMAIN)
        nextData.userInterestDomain = [
          ...(nextData.userInterestDomain || []),
          inputValue,
        ];

      if (
        dialogType === PROFILE_DIALOG.ADD_CAREER ||
        dialogType === PROFILE_DIALOG.ADD_PROJECT
      ) {
        const newItem = {
          id: crypto.randomUUID(),
          description: inputValue,
          startYear: extraData?.startYear || new Date().getFullYear(),
          startMonth: extraData?.startMonth || new Date().getMonth() + 1,
          endYear: extraData?.endYear || null,
          endMonth: extraData?.endMonth || null,
        };
        if (dialogType === PROFILE_DIALOG.ADD_CAREER) {
          nextData.userCareer = [
            ...(nextData.userCareer || []),
            newItem as never,
          ];
        } else {
          nextData.userProject = [
            ...(nextData.userProject || []),
            newItem as never,
          ];
        }
      }

      return nextData;
    });

    setDialogType(null);
    setDialogPayload(null);
  };

  return {
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
  };
};
