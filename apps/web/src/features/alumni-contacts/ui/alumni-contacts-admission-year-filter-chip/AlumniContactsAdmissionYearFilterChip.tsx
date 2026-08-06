'use client';

import { Button, Chip, Close } from '@causw/cds';

interface AlumniContactsAdmissionYearFilterChipProps {
  admissionYearStart: string;
  admissionYearEnd: string;
  onClick: () => void;
}

export const AlumniContactsAdmissionYearFilterChip = ({
  admissionYearStart,
  admissionYearEnd,
  onClick,
}: AlumniContactsAdmissionYearFilterChipProps) => {
  return (
    <Chip size="sm" color="white" className="gap-1">
      {admissionYearStart} - {admissionYearEnd}
      <Button
        className="h-fit w-fit bg-transparent p-0 hover:bg-transparent!"
        onClick={onClick}
      >
        <Close size={12} color="gray-400" />
      </Button>
    </Chip>
  );
};
