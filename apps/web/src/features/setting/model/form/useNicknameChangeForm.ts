'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  nicknameChangeFormSchema,
  type NicknameChangeFormData,
} from '@/entities/setting';

import { MAX_NICKNAME_LENGTH } from '@/shared/constants';

import { useChangeMyNicknameMutation } from '../mutations';

type UseNicknameChangeFormParams = {
  onClose: () => void;
};

export const useNicknameChangeForm = ({
  onClose,
}: UseNicknameChangeFormParams) => {
  const methods = useForm<NicknameChangeFormData>({
    resolver: zodResolver(nicknameChangeFormSchema),
    mode: 'onChange',
    defaultValues: { nickname: '' },
  });

  const nicknameValue = useWatch({
    control: methods.control,
    name: 'nickname',
  });
  const currentLength = nicknameValue?.length ?? 0;
  const errorMessage = methods.formState.errors.nickname?.message;

  const handleClose = () => {
    methods.reset();
    onClose();
  };

  const changeNicknameMutation = useChangeMyNicknameMutation({
    onSuccess: () => {
      handleClose();
    },
  });

  const onSubmit = (data: NicknameChangeFormData) => {
    changeNicknameMutation.mutate({ nickname: data.nickname });
  };

  return {
    methods,
    currentLength,
    errorMessage,
    onSubmit,
    handleClose,
    isSubmitting: changeNicknameMutation.isPending,
    maxNicknameLength: MAX_NICKNAME_LENGTH,
  };
};
