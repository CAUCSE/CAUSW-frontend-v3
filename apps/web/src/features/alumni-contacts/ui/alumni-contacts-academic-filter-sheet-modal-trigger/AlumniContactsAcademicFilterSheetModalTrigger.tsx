'use client';

import { ArrowDown, Button, Chip, HStack } from '@causw/cds';

interface AlumniContactsAcademicFilterSheetModalTriggerProps {
  onClick?: () => void;
}

export const AlumniContactsAcademicFilterSheetModalTrigger = ({
  onClick,
}: AlumniContactsAcademicFilterSheetModalTriggerProps) => {
  return (
    <Button asChild onClick={onClick}>
      <HStack gap="sm" className="typo-body-15-medium items-center">
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
