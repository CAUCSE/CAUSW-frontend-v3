'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { ACCEPTED_IMAGE_TYPES } from '@/shared/constants';
import { toast } from '@/shared/model';
import type {
  ProfileImageEditValue,
  UserProfileImageType,
} from '@/shared/types';

interface UseProfileImageEditDialogParams {
  initialValue: ProfileImageEditValue;
  onOpenChange: (open: boolean) => void;
  onSubmit: (value: ProfileImageEditValue) => void | Promise<void>;
  requireSubmitToClose: boolean;
}

export const useProfileImageEditDialog = ({
  initialValue,
  onOpenChange,
  onSubmit,
  requireSubmitToClose,
}: UseProfileImageEditDialogParams) => {
  const acceptedImageTypes = ACCEPTED_IMAGE_TYPES.split(',').map((type) =>
    type.trim(),
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const allowCloseRef = useRef(false);

  const [selectedType, setSelectedType] = useState<UserProfileImageType>(
    initialValue.profileImageType,
  );
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(
    initialValue.profileImageType === 'CUSTOM'
      ? (initialValue.profileImageUrl ?? null)
      : null,
  );
  const [customImageFile, setCustomImageFile] = useState<File | null>(
    initialValue.customImageFile ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const previewUrl = selectedType === 'CUSTOM' ? customImageUrl : null;
  const isSubmitDisabled =
    selectedType === initialValue.profileImageType &&
    (selectedType !== 'CUSTOM'
      ? true
      : (customImageUrl ?? null) === (initialValue.profileImageUrl ?? null));

  const selectedValue = useMemo<ProfileImageEditValue>(
    () => ({
      profileImageType: selectedType,
      profileImageUrl: selectedType === 'CUSTOM' ? customImageUrl : null,
      customImageFile: selectedType === 'CUSTOM' ? customImageFile : null,
    }),
    [customImageFile, customImageUrl, selectedType],
  );

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && requireSubmitToClose && !allowCloseRef.current) {
      return;
    }

    onOpenChange(nextOpen);
  };

  const handleCustomImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!acceptedImageTypes.includes(file.type)) {
      toast.error(
        '이미지 파일만 업로드할 수 있습니다. PNG 또는 JPG 파일을 선택해 주세요.',
      );
      event.target.value = '';
      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const nextObjectUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextObjectUrl;

    setSelectedType('CUSTOM');
    setCustomImageFile(file);
    setCustomImageUrl(nextObjectUrl);
    event.target.value = '';
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await onSubmit(selectedValue);
      allowCloseRef.current = true;
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
      allowCloseRef.current = false;
    }
  };

  return {
    fileInputRef,
    selectedType,
    customImageUrl,
    previewUrl,
    isSubmitDisabled,
    isSubmitting,
    setSelectedType,
    handleClose,
    handleDialogOpenChange,
    handleCustomImageChange,
    handleSubmit,
  };
};
