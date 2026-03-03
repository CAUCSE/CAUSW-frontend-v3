'use client';
import { useState } from 'react';

import { Modal, Text, VStack } from '@causw/cds';

import { AlumniContactsAcademicFilterModalTrigger } from '@/features/alumni-contacts';

export const AlumniContactsAcademicFilterModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleClickTrigger = () => {
    setIsOpen(true);
  };

  return (
    <>
      <AlumniContactsAcademicFilterModalTrigger onClick={handleClickTrigger} />
      <Modal open={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Title className="sr-only">
          동문 수첩 학번, 재학 상태 필터 선택 모달창
        </Modal.Title>
        <Modal.Content className="items-start p-6">
          <VStack>
            <VStack className="gap-3">
              <Text typography="subtitle-16-bold">학번</Text>
            </VStack>
            <VStack className="gap-3">
              <Text typography="subtitle-16-bold">학적 상태</Text>
            </VStack>
          </VStack>
        </Modal.Content>
      </Modal>
    </>
  );
};
