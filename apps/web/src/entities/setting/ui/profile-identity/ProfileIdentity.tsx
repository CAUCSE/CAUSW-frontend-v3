import { HStack, Separator, Text, VStack } from '@causw/cds';

type ProfileIdentityProps = {
  name: string;
  primaryInfo: string;
  secondaryInfo?: string;
};

export const ProfileIdentity = ({
  name,
  primaryInfo,
  secondaryInfo,
}: ProfileIdentityProps) => {
  return (
    <VStack align="center" gap="xs">
      <Text typography="subtitle-18-bold">{name}</Text>
      <HStack gap="sm" align="center">
        <Text typography="body-16-regular" textColor="gray-400">
          {primaryInfo}
        </Text>
        {secondaryInfo && (
          <>
            <Separator orientation="vertical" className="gray-400 h-2" />
            <Text typography="body-16-regular" textColor="gray-400">
              {secondaryInfo}
            </Text>
          </>
        )}
      </HStack>
    </VStack>
  );
};
