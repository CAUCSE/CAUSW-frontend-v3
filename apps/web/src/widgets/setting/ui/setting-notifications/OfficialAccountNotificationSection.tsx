import { Text, Toggle, VStack } from '@causw/cds';

import { SETTING_NOTIFICATIONS } from '../../config';

export const OfficialAccountNotificationSection = () => {
  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.official.title}
      </Text>
      <VStack className="gap-6">
        {SETTING_NOTIFICATIONS.official.items.map((item) => (
          <Toggle key={item} className="justify-between">
            <Toggle.Label typography="body-16-medium">{item}</Toggle.Label>
            <Toggle.Switch />
          </Toggle>
        ))}
      </VStack>
    </VStack>
  );
};
