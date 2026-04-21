'use client';

import {
  CTAButton,
  Dialog,
  Flex,
  HStack,
  mergeStyles,
  Plus,
  Text,
  VStack,
} from '@causw/cds';

import {
  ACCEPTED_IMAGE_TYPES,
  DEFAULT_PROFILE_IMAGE_TYPES,
} from '@/shared/constants';
import type { ProfileImageEditValue } from '@/shared/types';
import { ProfileAvatar } from '@/shared/ui';

import { useProfileImageEditDialog } from '../../model/hooks';

export interface ProfileImageEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: ProfileImageEditValue;
  onSubmit: (value: ProfileImageEditValue) => void | Promise<void>;
  requireSubmitToClose?: boolean;
}

export const ProfileImageEditDialog = ({
  open,
  onOpenChange,
  initialValue,
  onSubmit,
  requireSubmitToClose = false,
}: ProfileImageEditDialogProps) => {
  const {
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
  } = useProfileImageEditDialog({
    initialValue,
    onOpenChange,
    onSubmit,
    requireSubmitToClose,
  });

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <Dialog.Content
        className="w-[320px] overflow-hidden rounded-2xl bg-white px-4 py-4 md:w-[420px]"
        onPointerDownOutside={(event) => {
          if (requireSubmitToClose) {
            event.preventDefault();
          }
        }}
        onEscapeKeyDown={(event) => {
          if (requireSubmitToClose) {
            event.preventDefault();
          }
        }}
      >
        <Dialog.Title hidden>프로필 이미지 수정</Dialog.Title>

        <VStack className="h-full w-full gap-4">
          <VStack className="flex-1 gap-4">
            <Text
              typography="subtitle-18-bold"
              textColor="gray-800"
              className="p-1"
            >
              프로필 이미지 수정
            </Text>

            <Flex align="center" gap="lg" className="">
              <ProfileAvatar
                size={88}
                profileImageType={selectedType}
                profileImageUrl={previewUrl}
              />
              <VStack gap="sm" className="min-w-0 flex-1">
                <HStack gap="sm" className="flex-wrap">
                  {DEFAULT_PROFILE_IMAGE_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="cursor-pointer rounded-2xl p-0.5"
                      onClick={() => setSelectedType(type)}
                    >
                      <ProfileAvatar
                        size={40}
                        profileImageType={type}
                        className={mergeStyles(
                          selectedType === type &&
                            'ring-2 ring-gray-900 ring-offset-2',
                        )}
                      />
                    </button>
                  ))}

                  {customImageUrl && (
                    <button
                      type="button"
                      className="cursor-pointer rounded-2xl p-0.5"
                      onClick={() => setSelectedType('CUSTOM')}
                    >
                      <ProfileAvatar
                        size={40}
                        profileImageType="CUSTOM"
                        profileImageUrl={customImageUrl}
                        className={mergeStyles(
                          selectedType === 'CUSTOM' &&
                            'ring-2 ring-gray-900 ring-offset-2',
                        )}
                      />
                    </button>
                  )}

                  <button
                    type="button"
                    className="cursor-pointer rounded-2xl p-0.5"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gray-100 text-gray-500">
                      <Plus size={18} />
                    </div>
                  </button>
                </HStack>
              </VStack>
            </Flex>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              className="hidden"
              onChange={handleCustomImageChange}
            />

            <HStack gap="sm" className="mt-auto w-full">
              {!requireSubmitToClose && (
                <CTAButton
                  color="light"
                  fullWidth
                  type="button"
                  onClick={handleClose}
                >
                  닫기
                </CTAButton>
              )}
              <CTAButton
                color="dark"
                fullWidth
                type="button"
                disabled={isSubmitDisabled || isSubmitting}
                onClick={() => void handleSubmit()}
              >
                {isSubmitting ? '수정 중...' : '수정하기'}
              </CTAButton>
            </HStack>
          </VStack>
        </VStack>
      </Dialog.Content>
    </Dialog>
  );
};
