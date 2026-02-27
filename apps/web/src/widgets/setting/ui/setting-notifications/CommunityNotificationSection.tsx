import { Text, Toggle, VStack } from '@causw/cds';

import { SETTING_NOTIFICATIONS } from '../../config';

export const CommunityNotificationSection = () => {
  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.community.title}
      </Text>
      <VStack className="gap-6">
        {SETTING_NOTIFICATIONS.community.items.map((item, index) => (
          <Toggle key={`${item}-${index}`} className="justify-between">
            <Toggle.Label typography="body-16-medium">{item}</Toggle.Label>
            <Toggle.Switch />
          </Toggle>
        ))}
      </VStack>
    </VStack>
  );
};
