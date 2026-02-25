'use client';

import { useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  ceremonyFormSchema,
  CEREMONY_FORM_DEFAULT_VALUES,
} from '@/entities/ceremony';
import type { CeremonyFormData, CeremonyType } from '@/entities/ceremony';

export const useCeremonyForm = () => {
  const methods = useForm<CeremonyFormData>({
    resolver: zodResolver(ceremonyFormSchema),
    mode: 'onChange',
    defaultValues: CEREMONY_FORM_DEFAULT_VALUES,
  });

  const { control, setValue, reset } = methods;

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

  // --- 폼 초기화 ---
  const resetForm = () => {
    reset(CEREMONY_FORM_DEFAULT_VALUES);
    setShowCloseConfirm(false);
  };

  return {
    methods,
    isValid,

    // Handlers
    handleTypeChange,
    handleRelationshipChange,

    // 닫기 확인
    showCloseConfirm,
    setShowCloseConfirm,

    // 폼 초기화
    resetForm,
  };
};

export type CeremonyFormHookReturn = ReturnType<typeof useCeremonyForm>;
