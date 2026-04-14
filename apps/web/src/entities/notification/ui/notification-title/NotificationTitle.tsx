import { Text } from '@causw/cds';

interface NotificationTitleProps {
  title: string;
}

export const NotificationTitle = ({ title }: NotificationTitleProps) => {
  return (
    <Text
      typography="body-16-medium"
      className="w-full min-w-0 truncate pl-6 text-start"
    >
      {title}
    </Text>
  );
};
