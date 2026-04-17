import { DocumentColored, HStack, Text, VStack } from '@causw/cds';

import {
  formatAlumniContactsPeriod,
  type GetAlumniContactsDetailResponseDto,
} from '@/entities/alumni-contacts';

import { AlumniContactsDetailInfoEmptyView } from '../alumni-contacts-detail-info-empty-view';

interface AlumniContactProjectSectionProps {
  userProject: GetAlumniContactsDetailResponseDto['userProject'];
}

export const AlumniContactProjectSection = ({
  userProject,
}: AlumniContactProjectSectionProps) => {
  if (userProject.length === 0) {
    return <AlumniContactsDetailInfoEmptyView />;
  }
  return (
    <VStack className="gap-5">
      {userProject.map((project) => (
        <HStack key={project.id}>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-gray-100">
            <DocumentColored size={24} />
          </div>
          <VStack gap="xs" className="min-w-0">
            <Text typography="body-16-regular" textColor="gray-700">
              {project.description}
            </Text>
            <Text typography="body-14-regular" textColor="gray-400">
              {formatAlumniContactsPeriod(project)}
            </Text>
          </VStack>
        </HStack>
      ))}
    </VStack>
  );
};
