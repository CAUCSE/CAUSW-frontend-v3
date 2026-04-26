'use client';

import { Button, Dialog, HStack, Text, TextInput } from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

import { useAlumniContactsSnsAddDialog } from '../../model';

export const AlumniContactsSnsAddDialog = () => {
  const {
    isOpen,
    newSocialLink,
    isValid,
    addButtonRef,
    handleClickTrigger,
    canAdd,
    handleNewSocialLinkChange,
    handleOpenChange,
    handleCompositionStart,
    handleCompositionEnd,
    handleEnterPress,
    handleClickAddButton,
  } = useAlumniContactsSnsAddDialog();

  return (
    <>
      <AlumniContactsSingleFieldAddButton
        label="SNS 추가"
        onClick={handleClickTrigger}
        disabled={!canAdd}
      />
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Content className="w-80 gap-2 md:w-105">
          <Dialog.Title>
            <Text typography="subtitle-18-bold" textColor="gray-700">
              SNS 추가하기
            </Text>
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            SNS 링크를 추가합니다.
          </Dialog.Description>
          <TextInput
            placeholder="사이트 URL을 입력해주세요."
            className="bg-gray-100"
            onChange={handleNewSocialLinkChange}
            onKeyDown={handleEnterPress}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            value={newSocialLink}
            error={!isValid}
          />
          {!isValid && (
            <Text typography="body-14-regular" textColor="red-400">
              URL은 https://로 시작해야 합니다.
            </Text>
          )}
          <Dialog.Footer>
            <HStack gap="sm" className="pt-6">
              <Dialog.Close asChild>
                <Button color="gray" className="h-13 flex-1 rounded-md">
                  <Text typography="body-15-semibold" textColor="gray-600">
                    닫기
                  </Text>
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button
                  onClick={handleClickAddButton}
                  className="h-13 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800! disabled:bg-gray-200! disabled:[&_span]:text-gray-300!"
                  disabled={!canAdd}
                  ref={addButtonRef}
                >
                  <Text typography="body-15-semibold" textColor="white">
                    추가하기
                  </Text>
                </Button>
              </Dialog.Close>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
