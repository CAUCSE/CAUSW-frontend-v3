'use client';

import { type ChangeEvent, useState } from 'react';

import {
  Button,
  DatePicker,
  Dialog,
  HStack,
  Text,
  TextInput,
  Toggle,
  VStack,
} from '@causw/cds';

import { AlumniContactsSingleFieldAddButton } from '@/features/alumni-contacts';

export const AlumniContactsEditFormCareerSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newCareer, setNewCareer] = useState<string>('');

  const handleClickAddButton = () => {
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleCareerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewCareer(event.target.value);
  };

  return (
    <VStack className="w-full pt-3">
      <AlumniContactsSingleFieldAddButton
        label="경력 사항 추가"
        onClick={handleClickAddButton}
      />
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Content className="w-80 gap-8 md:w-105">
          <Dialog.Title className="sr-only">경력 추가하기</Dialog.Title>
          <VStack gap="sm">
            <Text typography="subtitle-18-bold" textColor="gray-700">
              경력 추가하기
            </Text>
            <TextInput
              placeholder="경력 사항을 입력해주세요."
              className="bg-gray-100"
              onChange={handleCareerChange}
              value={newCareer}
            />
          </VStack>
          <VStack gap="sm">
            <Text typography="subtitle-18-bold" textColor="gray-700">
              기간
            </Text>
            <HStack gap="sm" className="items-center">
              <DatePicker
                placeholder="연도-월"
                className="flex-1 bg-gray-100"
                calendarProps={{
                  className: 'z-[1001]!',
                }}
                contentClassName="z-1001!"
              />
              <div className="h-px w-2 shrink-0 bg-gray-300" />
              <DatePicker
                placeholder="연도-월"
                className="flex-1 bg-gray-100"
              />
            </HStack>
            <Toggle>
              <Toggle.Switch />
              <Toggle.Label>
                <Text typography="body-15-medium" textColor="gray-700">
                  재직 중
                </Text>
              </Toggle.Label>
            </Toggle>
          </VStack>
          <Dialog.Footer>
            <HStack gap="sm">
              <Dialog.Close asChild>
                <Button color="gray" className="h-13 flex-1 rounded-md">
                  <Text typography="body-15-semibold" textColor="gray-600">
                    닫기
                  </Text>
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button className="h-13 flex-1 rounded-md bg-gray-700 text-white hover:bg-gray-800!">
                  <Text typography="body-15-semibold" textColor="white">
                    추가하기
                  </Text>
                </Button>
              </Dialog.Close>
            </HStack>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </VStack>
  );
};
