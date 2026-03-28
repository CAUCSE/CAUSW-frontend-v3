'use client';

import { FormProvider, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  CTAButton,
  Dialog,
  Field,
  Flex,
  Text,
  TextInput,
  VStack,
} from '@causw/cds';

import { nicknameSchema, toast } from '@/shared/model';
import { ActionHeader } from '@/shared/ui';

type NicknameFormData = { nickname: z.infer<typeof nicknameSchema> };
const nicknameFormSchema = z.object({ nickname: nicknameSchema });

const MAX_NICKNAME_LENGTH = 8;

export interface NicknameChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NicknameChangeDialog = ({
  open,
  onOpenChange,
}: NicknameChangeDialogProps) => {
  const methods = useForm<NicknameFormData>({
    resolver: zodResolver(nicknameFormSchema),
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
    onOpenChange(false);
  };

  const onSubmit = (data: NicknameFormData) => {
    // TODO: 닉네임 변경 API 연결
    console.log('닉네임 변경:', data.nickname);
    toast.success('닉네임이 변경되었습니다.');
    handleClose();
  };

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
                          currentLength >= MAX_NICKNAME_LENGTH
                            ? 'red-400'
                            : 'gray-400'
                        }
                      >
                        {currentLength}/{MAX_NICKNAME_LENGTH}
                      </Text>
                    }
                    placeholder="변경할 닉네임을 입력해주세요."
                    typography="body-16-regular"
                    maxLength={MAX_NICKNAME_LENGTH}
                  />

                  <Field.ErrorDescription>
                    {errorMessage}
                  </Field.ErrorDescription>
                </Field>

                <CTAButton
                  color="dark"
                  fullWidth
                  type="submit"
                  disabled={!methods.formState.isValid}
                >
                  변경하기
                </CTAButton>
              </VStack>
            </VStack>
          </VStack>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
};
