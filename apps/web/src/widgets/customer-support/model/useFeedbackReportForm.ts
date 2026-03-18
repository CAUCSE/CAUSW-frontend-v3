import { useMemo, useRef, useState } from 'react';

import { useForm, useWatch } from 'react-hook-form';

import { ImageUploadFieldRef } from '@/shared/ui/image';

const MAX_PHOTO_COUNT = 4;

type FeedbackFormValues = {
  images: File[];
};

export const useFeedbackReportForm = () => {
  const [satisfactionScore, setSatisfactionScore] = useState<number | null>(
    null,
  );
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const imageUploadFieldRef = useRef<ImageUploadFieldRef>(null);

  const { setValue, control } = useForm<FeedbackFormValues>({
    defaultValues: { images: [] },
  });

  const attachedImages = useWatch({ control, name: 'images' }) ?? [];

  const isSubmitEnabled = useMemo(() => {
    return Boolean(satisfactionScore) && feedbackMessage.trim().length > 0;
  }, [feedbackMessage, satisfactionScore]);

  const handleAttachPhotoClick = () => {
    imageUploadFieldRef.current?.openFilePicker();
  };

  return {
    satisfactionScore,
    setSatisfactionScore,
    feedbackMessage,
    setFeedbackMessage,
    imageUploadFieldRef,
    setValue,
    attachedImages,
    isSubmitEnabled,
    handleAttachPhotoClick,
    maxPhotoCount: MAX_PHOTO_COUNT,
  };
};
