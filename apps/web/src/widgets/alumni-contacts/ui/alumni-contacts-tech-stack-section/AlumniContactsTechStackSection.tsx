import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';

interface AlumniContactsTechStackSectionProps {
  userTechStack: GetAlumniContactsDetailResponseDto['userTechStack'];
}

export const AlumniContactsTechStackSection = ({
  userTechStack,
}: AlumniContactsTechStackSectionProps) => {
  if (userTechStack.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }

  return (
    <HStack gap="sm" className="overflow-x-auto">
      {userTechStack.map((techStack) => (
        <Chip key={techStack} size="md" color="lightgray">
          {techStack}
        </Chip>
      ))}
    </HStack>
  );
};
