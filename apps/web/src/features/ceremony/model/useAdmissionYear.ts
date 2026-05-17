'use client';

import { useState } from 'react';

import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import type { CeremonyFormData } from '@/entities/ceremony';

export const useAdmissionYear = (
  getValues: UseFormGetValues<CeremonyFormData>,
  setValue: UseFormSetValue<CeremonyFormData>,
) => {
  const [showAdmissionYearModal, setShowAdmissionYearModal] = useState(false);
  const [admissionYearInput, setAdmissionYearInput] = useState('');

  const handleAddAdmissionYear = () => {
    const trimmed = admissionYearInput.trim();
    if (!/^\d{4}$/.test(trimmed)) return;
    const current = getValues('admissionYears');
    if (!current.includes(trimmed)) {
      setValue('admissionYears', [...current, trimmed], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
    setAdmissionYearInput('');
    setShowAdmissionYearModal(false);
  };

  const handleRemoveAdmissionYear = (year: string) => {
    const current = getValues('admissionYears');
    setValue(
      'admissionYears',
      current.filter((y) => y !== year),
      { shouldDirty: true, shouldValidate: true },
    );
  };

  return {
    showAdmissionYearModal,
    setShowAdmissionYearModal,
    admissionYearInput,
    setAdmissionYearInput,
    handleAddAdmissionYear,
    handleRemoveAdmissionYear,
  };
};
