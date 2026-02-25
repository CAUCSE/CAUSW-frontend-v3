'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  ceremonyFormSchema,
  CEREMONY_FORM_DEFAULT_VALUES,
} from '@/entities/ceremony';
import type { CeremonyFormData } from '@/entities/ceremony';

import { loadDaumPostcode } from '@/shared/lib/daum-postcode';
import type { CeremonyType } from '@/shared/types';
import type { ImageUploadFieldRef } from '@/shared/ui/image';

import { CUSTOM_VALUE, CATEGORY_MAP } from '../config';

export const useCeremonyForm = () => {
  const methods = useForm<CeremonyFormData>({
    resolver: zodResolver(ceremonyFormSchema),
    mode: 'onChange',
    defaultValues: CEREMONY_FORM_DEFAULT_VALUES,
  });

  const { control, setValue, getValues, reset } = methods;

  // --- 비폼 UI 상태 ---
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [showAdmissionYearModal, setShowAdmissionYearModal] = useState(false);
  const [admissionYearInput, setAdmissionYearInput] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const [photoResetTrigger, setPhotoResetTrigger] = useState(false);
  const [, setPhotoFiles] = useState<File[]>([]);
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);
  const postcodeRef = useRef<HTMLDivElement>(null);

  // --- Watch ---
  const watchedValues = useWatch({ control });

  const ceremonyType = watchedValues.ceremonyType ?? '';
  const category = watchedValues.category ?? '';
  const customCategory = watchedValues.customCategory ?? '';

  // --- Derived ---
  const isCustom = category === CUSTOM_VALUE;
  const categoryOptions = ceremonyType
    ? CATEGORY_MAP[ceremonyType as CeremonyType]
    : [];
  const resolvedCategory = isCustom ? customCategory.trim() : category;

  // --- Validation ---
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

  const handleAddAdmissionYear = () => {
    const trimmed = admissionYearInput.trim();
    const current = getValues('admissionYears');
    if (trimmed && !current.includes(trimmed)) {
      setValue('admissionYears', [...current, trimmed]);
    }
    setAdmissionYearInput('');
    setShowAdmissionYearModal(false);
  };

  const handleRemoveAdmissionYear = (year: string) => {
    const current = getValues('admissionYears');
    setValue(
      'admissionYears',
      current.filter((y) => y !== year),
    );
  };

  const handleSetPhotoFiles = useCallback((_name: string, value: unknown) => {
    setPhotoFiles(value as File[]);
  }, []);

  // --- Daum Postcode embed ---
  useEffect(() => {
    if (!showPostcode) return;
    loadDaumPostcode().then(() => {
      const container = postcodeRef.current;
      if (!container) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Daum Postcode SDK has no type definitions
      new (window as any).daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          setValue('postalCode', data.zonecode);
          setValue('address', data.address);
          setShowPostcode(false);
        },
        width: '100%',
        height: '100%',
      }).embed(container);
    });
  }, [showPostcode, setValue]);

  // --- Reset ---
  const resetForm = () => {
    reset(CEREMONY_FORM_DEFAULT_VALUES);
    setShowCloseConfirm(false);
    setShowAdmissionYearModal(false);
    setAdmissionYearInput('');
    setShowPostcode(false);
    setPhotoFiles([]);
    setPhotoResetTrigger((prev) => !prev);
  };

  return {
    methods,

    // Derived
    isCustom,
    categoryOptions,
    resolvedCategory,
    isValid,

    // Handlers
    handleTypeChange,
    handleRelationshipChange,
    handleEndDateToggle,
    handleTimeToggle,
    handleAddAdmissionYear,
    handleRemoveAdmissionYear,
    handleSetPhotoFiles,

    // 비폼 UI state
    showCloseConfirm,
    setShowCloseConfirm,
    showAdmissionYearModal,
    setShowAdmissionYearModal,
    admissionYearInput,
    setAdmissionYearInput,
    showPostcode,
    setShowPostcode,
    photoResetTrigger,
    imageUploadRef,
    postcodeRef,

    // Actions
    resetForm,
  };
};

export type CeremonyFormHookReturn = ReturnType<typeof useCeremonyForm>;
