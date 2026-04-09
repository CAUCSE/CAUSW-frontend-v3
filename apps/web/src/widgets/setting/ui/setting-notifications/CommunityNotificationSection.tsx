import { Text, Toggle, VStack } from '@causw/cds';

import { type CommunityNotificationSettings } from '@/entities/notification';

import { SETTING_NOTIFICATIONS } from '../../config';

type CommunityNotificationSectionProps = {
  settings: CommunityNotificationSettings;
  onToggle: (
    key: keyof CommunityNotificationSettings,
    checked: boolean,
  ) => void;
};

export const CommunityNotificationSection = ({
  settings,
  onToggle,
}: CommunityNotificationSectionProps) => {
  return (
    <VStack className="gap-5 rounded-lg bg-white p-5">
      <Text typography="body-14-regular" textColor="gray-500">
        {SETTING_NOTIFICATIONS.community.title}
      </Text>
      <VStack className="gap-6">
        <Toggle
          checked={settings.likeOnMyPost}
          onCheckedChange={(checked) =>
            onToggle('likeOnMyPost', Boolean(checked))
          }
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">
            내 글에 좋아요
          </Toggle.Label>
          <Toggle.Switch />
        </Toggle>
        <Toggle
          checked={settings.commentOnMyPost}
          onCheckedChange={(checked) =>
            onToggle('commentOnMyPost', Boolean(checked))
          }
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">내 글에 댓글</Toggle.Label>
          <Toggle.Switch />
        </Toggle>
        <Toggle
          checked={settings.replyOnMyComment}
          onCheckedChange={(checked) =>
            onToggle('replyOnMyComment', Boolean(checked))
          }
          className="justify-between"
        >
          <Toggle.Label typography="body-16-medium">
            내 글에 대댓글
          </Toggle.Label>
          <Toggle.Switch />
        </Toggle>
      </VStack>
    </VStack>
  );
};
