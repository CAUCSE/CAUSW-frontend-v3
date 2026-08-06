'use client';

import { ArrowDown, Button, Chip, HStack } from '@causw/cds';

interface AlumniContactsAcademicFilterSheetModalTriggerProps {
  onClick?: () => void;
}

export const AlumniContactsAcademicFilterSheetModalTrigger = ({
  onClick,
}: AlumniContactsAcademicFilterSheetModalTriggerProps) => {
  const handleClick = () => {
    onClick?.();
  };
  return (
    <Button
      asChild
      onClick={handleClick}
      color="white"
      className="h-fit w-fit p-0"
    >
      <HStack gap="none" className="typo-body-15-medium items-center gap-0">
        <Chip color="white" size="sm" className="cursor-pointer gap-1">
          학번 <ArrowDown size={12} color="gray-400" />
        </Chip>
        <Chip color="white" size="sm" className="cursor-pointer gap-1">
          학적 상태 <ArrowDown size={12} color="gray-400" />
        </Chip>
      </HStack>
    </Button>
  );
};
