'use client';

import { FormProvider } from 'react-hook-form';

import {
  CTAButton,
  Dialog,
  Field,
  Flex,
  Text,
  TextInput,
  VStack,
} from '@causw/cds';

import { useNicknameChangeForm } from '@/features/setting';

import { ActionHeader } from '@/shared/ui';

export interface NicknameChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NicknameChangeDialog = ({
  open,
  onOpenChange,
}: NicknameChangeDialogProps) => {
  const {
    methods,
    currentLength,
    errorMessage,
    onSubmit,
    handleClose,
    isSubmitting,
    maxNicknameLength,
  } = useNicknameChangeForm({
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 모바일: 풀스크린 / 데스크탑: 고정 크기 모달 */}
      <Dialog.Content className="h-full w-full overflow-hidden rounded-none bg-gray-100 px-0 py-0 md:h-auto md:w-full md:max-w-[420px] md:rounded-2xl md:px-8 md:py-8">
        <Dialog.Title hidden>닉네임 변경</Dialog.Title>

        <FormProvider {...methods}>
          <VStack
            as="form"
            gap="none"
            className="h-full w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            {/* 모바일 헤더 (md 이상에서는 숨김) */}
            <div className="md:hidden">
              <ActionHeader>
                <ActionHeader.BackButton type="button" onClick={handleClose}>
                  뒤로
                </ActionHeader.BackButton>
              </ActionHeader>
            </div>

            <VStack className="flex-1 gap-6 px-4 py-4 md:px-0 md:py-0">
              <Text typography="title-22-bold" textColor="gray-800">
                닉네임 변경
              </Text>

              <VStack className="w-full gap-8">
                {/* 라벨 우측에 X/20 카운트 표시 */}
                <Field className="flex flex-col gap-2" error={!!errorMessage}>
                  <Flex justify="between" align="center">
                    <Field.Label>닉네임</Field.Label>
                  </Flex>
                  <TextInput
                    {...methods.register('nickname')}
                    rightIcon={
                      <Text
                        typography="body-16-regular"
                        textColor={
                          currentLength >= maxNicknameLength
                            ? 'red-400'
                            : 'gray-400'
                        }
                      >
                        {currentLength}/{maxNicknameLength}
                      </Text>
                    }
                    placeholder="변경할 닉네임을 입력해주세요."
                    typography="body-16-regular"
                    maxLength={maxNicknameLength}
                  />

                  <Field.ErrorDescription>
                    {errorMessage}
                  </Field.ErrorDescription>
                </Field>

                <CTAButton
                  color="dark"
                  fullWidth
                  type="submit"
                  disabled={!methods.formState.isValid || isSubmitting}
                >
                  {isSubmitting ? '변경 중...' : '변경하기'}
                </CTAButton>
              </VStack>
            </VStack>
          </VStack>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
};
