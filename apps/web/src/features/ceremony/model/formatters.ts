import type {
  CeremonyCreateRequest,
  CeremonyFormData,
} from '@/entities/ceremony';

import {
  CEREMONY_TYPE_API_MAP,
  CATEGORY_API_MAP,
  CUSTOM_VALUE,
  RELATIONSHIP_API_MAP,
} from '../config';

export const formatTime = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
};

const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const emptyToNull = (value: string): string | null =>
  value.trim() === '' ? null : value.trim();

export const toCreateCeremonyDto = (
  form: CeremonyFormData,
): CeremonyCreateRequest => {
  const ceremonyType =
    CEREMONY_TYPE_API_MAP[
      form.ceremonyType as keyof typeof CEREMONY_TYPE_API_MAP
    ];

  const isCustomCategory = form.category === CUSTOM_VALUE;
  const ceremonyCategory = isCustomCategory
    ? 'ETC'
    : (CATEGORY_API_MAP[form.category] ?? 'ETC');
  const ceremonyCustomCategory = isCustomCategory
    ? form.customCategory.trim()
    : null;

  const relationType = RELATIONSHIP_API_MAP[form.relationship] ?? 'ME';

  return {
    ceremonyType,
    ceremonyCategory,
    ceremonyCustomCategory,
    startDate: form.startDate ? formatDateToString(form.startDate) : '',
    endDate:
      form.hasEndDate && form.endDate ? formatDateToString(form.endDate) : null,
    startTime: form.hasTime ? emptyToNull(form.startTime) : null,
    endTime: form.hasTime ? emptyToNull(form.endTime) : null,
    relationType,
    familyRelation:
      relationType === 'FAMILY' ? emptyToNull(form.familyRelation) : null,
    alumniRelation:
      relationType === 'INSTEAD' ? emptyToNull(form.alumniRelation) : null,
    alumniName:
      relationType === 'INSTEAD' ? emptyToNull(form.alumniName) : null,
    alumniAdmissionYear:
      relationType === 'INSTEAD' ? emptyToNull(form.alumniAdmissionYear) : null,
    content: emptyToNull(form.content),
    address: emptyToNull(form.address),
    postalAddress: emptyToNull(form.postalCode),
    detailedAddress: emptyToNull(form.detailAddress),
    contact: emptyToNull(form.phone),
    link: emptyToNull(form.relatedLink),
    isSetAll: form.notifyAll,
    targetAdmissionYears: form.notifyAll
      ? null
      : form.admissionYears.map(Number),
  };
};
