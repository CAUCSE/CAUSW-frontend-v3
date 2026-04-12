import { Chip, HStack } from '@causw/cds';

import { type GetAlumniContactsDetailResponseDto } from '@/entities/alumni-contacts';

interface AlumniContactsTechStackSectionProps {
  userTechStack: GetAlumniContactsDetailResponseDto['userTechStack'];
}

export const AlumniContactsTechStackSection = ({
  userTechStack,
}: AlumniContactsTechStackSectionProps) => {
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
