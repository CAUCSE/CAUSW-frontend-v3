import { Button, Chip } from '@causw/cds';

import {
  ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION,
  type AlumniContactsAcademicStatusFilterOption,
} from '@/entities/alumni-contacts';

interface AlumniContactsAcademicStatusFilterButtonProps {
  status: AlumniContactsAcademicStatusFilterOption;
}

export const AlumniContactsAcademicStatusFilterButton = ({
  status,
}: AlumniContactsAcademicStatusFilterButtonProps) => {
  return (
    <Button className="h-fit w-fit rounded-md p-0">
      <Chip size="md" color="lightgray" className="cursor-pointer">
        {ALUMNI_CONTACTS_ACADEMIC_STATUS_FILTER_OPTION[status].label}
      </Chip>
    </Button>
  );
};
