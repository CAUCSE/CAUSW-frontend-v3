import { Text, Toggle, VStack } from '@causw/cds';

import { type OfficialBoardNotificationSettings } from '@/entities/notification';

import { SETTING_NOTIFICATIONS } from '../../config';

type OfficialAccountNotificationSectionProps = {
  boards: OfficialBoardNotificationSettings[];
};

export const OfficialAccountNotificationSection = ({
  boards,
}: OfficialAccountNotificationSectionProps) => {
  if (boards.length === 0) return null;

  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.official.title}
      </Text>
      <VStack className="gap-6">
        {boards.map((board) => (
          <Toggle
            key={board.boardId}
            checked={board.subscribed}
            className="justify-between"
          >
            <Toggle.Label typography="body-16-medium">
              {board.name}
            </Toggle.Label>
            <Toggle.Switch />
          </Toggle>
        ))}
      </VStack>
    </VStack>
  );
};
