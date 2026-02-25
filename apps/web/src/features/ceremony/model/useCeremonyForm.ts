'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

import { loadDaumPostcode } from '@/shared/lib/daum-postcode';
import type { CeremonyType } from '@/shared/types';
import type { ImageUploadFieldRef } from '@/shared/ui/image';

import { CUSTOM_VALUE, CATEGORY_MAP } from '../config';

import { formatTime } from './formatters';
import { useFormattedInput } from './useFormattedInput';

export interface CeremonyFormReturn {
  // Type / Category
  ceremonyType: CeremonyType | '';
  category: string;
  customCategory: string;
  isCustom: boolean;
  categoryOptions: (typeof CATEGORY_MAP)[CeremonyType];
  resolvedCategory: string;
  setCategory: (v: string) => void;
  setCustomCategory: (v: string) => void;
  handleTypeChange: (type: CeremonyType) => void;

  // Relationship
  relationship: string;
  familyRelation: string;
  alumniName: string;
  alumniAdmissionYear: string;
  alumniRelation: string;
  setFamilyRelation: (v: string) => void;
  setAlumniName: (v: string) => void;
  setAlumniAdmissionYear: (v: string) => void;
  setAlumniRelation: (v: string) => void;
  handleRelationshipChange: (v: string) => void;

  // DateTime
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (v: Date | undefined) => void;
  setEndDate: (v: Date | undefined) => void;
  startTime: string;
  endTime: string;
  hasEndDate: boolean;
  hasTime: boolean;
  onStartTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateToggle: (checked: boolean) => void;
  handleTimeToggle: (checked: boolean) => void;

  // Notification
  notifyAll: boolean;
  setNotifyAll: (v: boolean) => void;
  admissionYears: string[];
  showAdmissionYearModal: boolean;
  setShowAdmissionYearModal: (v: boolean) => void;
  admissionYearInput: string;
  setAdmissionYearInput: (v: string) => void;
  handleAddAdmissionYear: () => void;
  handleRemoveAdmissionYear: (year: string) => void;

  // Content
  content: string;
  setContent: (v: string) => void;
  photoResetTrigger: boolean;
  imageUploadRef: React.RefObject<ImageUploadFieldRef | null>;
  handleSetPhotoFiles: (name: string, value: unknown) => void;

  // Address
  postalCode: string;
  address: string;
  detailAddress: string;
  showPostcode: boolean;
  postcodeRef: React.RefObject<HTMLDivElement | null>;
  setShowPostcode: (v: boolean) => void;
  setDetailAddress: (v: string) => void;

  // Contact
  phone: string;
  setPhone: (v: string) => void;
  relatedLink: string;
  setRelatedLink: (v: string) => void;

  // UI
  showCloseConfirm: boolean;
  setShowCloseConfirm: (v: boolean) => void;

  // Validation
  isRelationshipValid: boolean;
  isValid: boolean;

  // Actions
  resetForm: () => void;
}

export const useCeremonyForm = (): CeremonyFormReturn => {
  // --- Type / Category ---
  const [ceremonyType, setCeremonyType] = useState<CeremonyType | ''>('');
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  // --- Relationship ---
  const [relationship, setRelationship] = useState('');
  const [familyRelation, setFamilyRelation] = useState('');
  const [alumniName, setAlumniName] = useState('');
  const [alumniAdmissionYear, setAlumniAdmissionYear] = useState('');
  const [alumniRelation, setAlumniRelation] = useState('');

  // --- DateTime ---
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [hasTime, setHasTime] = useState(false);

  const onStartTimeChange = useFormattedInput(formatTime, setStartTime);
  const onEndTimeChange = useFormattedInput(formatTime, setEndTime);

  // --- Notification ---
  const [notifyAll, setNotifyAll] = useState(false);
  const [admissionYears, setAdmissionYears] = useState<string[]>([]);
  const [showAdmissionYearModal, setShowAdmissionYearModal] = useState(false);
  const [admissionYearInput, setAdmissionYearInput] = useState('');

  // --- Content ---
  const [content, setContent] = useState('');
  const [, setPhotoFiles] = useState<File[]>([]);
  const [photoResetTrigger, setPhotoResetTrigger] = useState(false);
  const imageUploadRef = useRef<ImageUploadFieldRef>(null);

  // --- Address ---
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const postcodeRef = useRef<HTMLDivElement>(null);

  // --- Contact ---
  const [phone, setPhone] = useState('');
  const [relatedLink, setRelatedLink] = useState('');

  // --- UI ---
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // --- Daum Postcode embed ---
  useEffect(() => {
    if (!showPostcode) return;
    loadDaumPostcode().then(() => {
      const container = postcodeRef.current;
      if (!container) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Daum Postcode SDK has no type definitions
      new (window as any).daum.Postcode({
        oncomplete: (data: { zonecode: string; address: string }) => {
          setPostalCode(data.zonecode);
          setAddress(data.address);
          setShowPostcode(false);
        },
        width: '100%',
        height: '100%',
      }).embed(container);
    });
  }, [showPostcode]);

  // --- Derived ---
  const isCustom = category === CUSTOM_VALUE;
  const categoryOptions = ceremonyType ? CATEGORY_MAP[ceremonyType] : [];
  const resolvedCategory = isCustom ? customCategory.trim() : category;

  // --- Handlers ---
  const handleTypeChange = (type: CeremonyType) => {
    setCeremonyType(type);
    setCategory('');
    setCustomCategory('');
  };

  const handleRelationshipChange = (value: string) => {
    setRelationship(value);
    setFamilyRelation('');
    setAlumniName('');
    setAlumniAdmissionYear('');
    setAlumniRelation('');
  };

  const handleEndDateToggle = (checked: boolean) => {
    setHasEndDate(checked);
    if (!checked) setEndDate(undefined);
  };

  const handleTimeToggle = (checked: boolean) => {
    setHasTime(checked);
    if (!checked) {
      setStartTime('');
      setEndTime('');
    }
  };

  const handleAddAdmissionYear = () => {
    const trimmed = admissionYearInput.trim();
    if (trimmed && !admissionYears.includes(trimmed)) {
      setAdmissionYears((prev) => [...prev, trimmed]);
    }
    setAdmissionYearInput('');
    setShowAdmissionYearModal(false);
  };

  const handleRemoveAdmissionYear = (year: string) => {
    setAdmissionYears((prev) => prev.filter((y) => y !== year));
  };

  const handleSetPhotoFiles = useCallback((_name: string, value: unknown) => {
    setPhotoFiles(value as File[]);
  }, []);

  const resetForm = () => {
    setCeremonyType('');
    setCategory('');
    setCustomCategory('');
    setRelationship('');
    setFamilyRelation('');
    setAlumniName('');
    setAlumniAdmissionYear('');
    setAlumniRelation('');
    setStartDate(undefined);
    setEndDate(undefined);
    setStartTime('');
    setEndTime('');
    setHasEndDate(false);
    setHasTime(false);
    setNotifyAll(false);
    setContent('');
    setPostalCode('');
    setAddress('');
    setShowPostcode(false);
    setDetailAddress('');
    setPhone('');
    setRelatedLink('');
    setAdmissionYears([]);
    setAdmissionYearInput('');
    setPhotoFiles([]);
    setPhotoResetTrigger((prev) => !prev);
  };

  // --- Validation ---
  const isRelationshipValid =
    relationship === '본인' ||
    (relationship === '가족' && familyRelation !== '') ||
    (relationship === '동문소식 대신 전달' &&
      alumniName.trim() !== '' &&
      alumniAdmissionYear.trim() !== '' &&
      alumniRelation !== '');

  const isValid =
    ceremonyType !== '' &&
    resolvedCategory !== '' &&
    isRelationshipValid &&
    startDate !== undefined &&
    (notifyAll || admissionYears.length > 0);

  return {
    ceremonyType,
    category,
    customCategory,
    isCustom,
    categoryOptions,
    resolvedCategory,
    setCategory,
    setCustomCategory,
    handleTypeChange,

    relationship,
    familyRelation,
    alumniName,
    alumniAdmissionYear,
    alumniRelation,
    setFamilyRelation,
    setAlumniName,
    setAlumniAdmissionYear,
    setAlumniRelation,
    handleRelationshipChange,

    startDate,
    endDate,
    setStartDate,
    setEndDate,
    startTime,
    endTime,
    hasEndDate,
    hasTime,
    onStartTimeChange,
    onEndTimeChange,
    handleEndDateToggle,
    handleTimeToggle,

    notifyAll,
    setNotifyAll,
    admissionYears,
    showAdmissionYearModal,
    setShowAdmissionYearModal,
    admissionYearInput,
    setAdmissionYearInput,
    handleAddAdmissionYear,
    handleRemoveAdmissionYear,

    content,
    setContent,
    photoResetTrigger,
    imageUploadRef,
    handleSetPhotoFiles,

    postalCode,
    address,
    detailAddress,
    showPostcode,
    postcodeRef,
    setShowPostcode,
    setDetailAddress,

    phone,
    setPhone,
    relatedLink,
    setRelatedLink,

    showCloseConfirm,
    setShowCloseConfirm,

    isRelationshipValid,
    isValid,

    resetForm,
  };
};
