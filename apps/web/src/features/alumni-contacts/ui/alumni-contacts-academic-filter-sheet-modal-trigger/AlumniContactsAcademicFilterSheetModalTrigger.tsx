'use client';

import { useShallow } from 'zustand/shallow';

import { ArrowDown, Button, Chip, HStack } from '@causw/cds';

import {
  useAlumniContactsAcademicFilterSheetModalContext,
  useAlumniContactsFilterStore,
} from '@/entities/alumni-contacts';

interface AlumniContactsAcademicFilterSheetModalTriggerProps {
  onClick?: () => void;
}

export const AlumniContactsAcademicFilterSheetModalTrigger = ({
  onClick,
}: AlumniContactsAcademicFilterSheetModalTriggerProps) => {
  const {
    currentStartAdmissionYear,
    currentEndAdmissionYear,
    currentAcademicStatus,
  } = useAlumniContactsFilterStore(
    useShallow((state) => ({
      currentStartAdmissionYear: state.admissionYearStart,
      currentEndAdmissionYear: state.admissionYearEnd,
      currentAcademicStatus: state.academicStatus,
    })),
  );
  const { initialize } = useAlumniContactsAcademicFilterSheetModalContext();

  const handleClick = () => {
    if (onClick) {
      initialize(
        currentStartAdmissionYear,
        currentEndAdmissionYear,
        currentAcademicStatus,
      );
      onClick();
    }
  };
  return (
    <Button asChild onClick={handleClick}>
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
