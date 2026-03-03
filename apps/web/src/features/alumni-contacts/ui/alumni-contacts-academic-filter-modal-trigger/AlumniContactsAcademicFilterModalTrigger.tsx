'use client';

import { ArrowDown, Button, Chip, HStack } from '@causw/cds';

interface AlumniContactsAcademicFilterModalTriggerProps {
  onClick?: () => void;
}

export const AlumniContactsAcademicFilterModalTrigger = ({
  onClick,
}: AlumniContactsAcademicFilterModalTriggerProps) => {
  return (
    <Button asChild onClick={onClick}>
      <HStack gap="sm" className="items-center">
        <Chip color="white" size="md" className="cursor-pointer">
          학번 <ArrowDown size={14} color="gray-400" />
        </Chip>
        <Chip color="white" size="md" className="cursor-pointer">
          학적 상태 <ArrowDown size={14} color="gray-400" />
        </Chip>
      </HStack>
    </Button>
  );
};
