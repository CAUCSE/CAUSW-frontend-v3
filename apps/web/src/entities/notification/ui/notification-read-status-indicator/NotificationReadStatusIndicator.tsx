interface NotificationReadStatusIndicatorProps {
  isRead: boolean;
}

export const NotificationReadStatusIndicator = ({
  isRead,
}: NotificationReadStatusIndicatorProps) => {
  if (isRead) return null;

  return (
    <div className="absolute top-2 right-2 size-2 rounded-full bg-red-400" />
  );
};
