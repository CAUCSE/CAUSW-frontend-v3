import { Text } from '@causw/cds';

interface NotificationTitleProps {
  title: string;
}

export const NotificationTitle = ({ title }: NotificationTitleProps) => {
  return (
    <Text typography="body-16-medium" className="self-start pl-6">
      {title}
    </Text>
  );
};
