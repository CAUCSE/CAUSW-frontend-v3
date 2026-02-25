'use client';

import { useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  ceremonyFormSchema,
  CEREMONY_FORM_DEFAULT_VALUES,
} from '@/entities/ceremony';
import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

import { useAdmissionYear } from './useAdmissionYear';
import { useDaumPostcode } from './useDaumPostcode';
import { useImageUpload } from './useImageUpload';

export const useCeremonyForm = () => {
  const methods = useForm<CeremonyFormData>({
    resolver: zodResolver(ceremonyFormSchema),
    mode: 'onChange',
    defaultValues: CEREMONY_FORM_DEFAULT_VALUES,
  });

  const { control, setValue, getValues, reset } = methods;

  // --- 비폼 UI 상태 (서브 훅) ---
  const postcode = useDaumPostcode(setValue);
  const admissionYear = useAdmissionYear(getValues, setValue);
  const imageUpload = useImageUpload();

  // --- 닫기 확인 ---
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // --- Watch ---
  const watchedValues = useWatch({ control });
  const isValid = ceremonyFormSchema.safeParse(watchedValues).success;

  // --- Handlers ---
  const handleTypeChange = (type: CeremonyType) => {
    setValue('ceremonyType', type);
    setValue('category', '');
    setValue('customCategory', '');
  };

  const handleRelationshipChange = (
    value: CeremonyFormData['relationship'],
  ) => {
    setValue('relationship', value);
    setValue('familyRelation', '');
    setValue('alumniName', '');
    setValue('alumniAdmissionYear', '');
    setValue('alumniRelation', '');
  };

  const handleEndDateToggle = (checked: boolean) => {
    setValue('hasEndDate', checked);
    if (!checked) setValue('endDate', undefined);
  };

  const handleTimeToggle = (checked: boolean) => {
    setValue('hasTime', checked);
    if (!checked) {
      setValue('startTime', '');
      setValue('endTime', '');
    }
  };

  // --- 폼 초기화 ---
  const resetForm = () => {
    reset(CEREMONY_FORM_DEFAULT_VALUES);
    setShowCloseConfirm(false);
    postcode.setShowPostcode(false);
    admissionYear.setShowAdmissionYearModal(false);
    admissionYear.setAdmissionYearInput('');
    imageUpload.resetImageUpload();
  };

  return {
    methods,
    isValid,

    // Handlers
    handleTypeChange,
    handleRelationshipChange,
    handleEndDateToggle,
    handleTimeToggle,

    // 닫기 확인
    showCloseConfirm,
    setShowCloseConfirm,

    // 비폼 UI 상태 (서브 훅 위임)
    ...postcode,
    ...admissionYear,
    ...imageUpload,

    // 폼 초기화
    resetForm,
  };
};

export type CeremonyFormHookReturn = ReturnType<typeof useCeremonyForm>;
