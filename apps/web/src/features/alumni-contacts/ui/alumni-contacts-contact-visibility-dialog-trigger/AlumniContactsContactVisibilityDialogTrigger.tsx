import { Button, Call, Message, Text } from '@causw/cds';

const triggerButtonContent = [
  {
    label: '전화',
    icon: <Call size={16} />,
  },
  {
    label: '문자',
    icon: <Message size={16} />,
  },
] as const;

interface AlumniContactsContactVisibilityDialogTriggerProps {
  isPhoneNumberVisible: boolean;
  onClick: () => void;
}

export const AlumniContactsContactVisibilityDialogTrigger = ({
  isPhoneNumberVisible,
  onClick,
}: AlumniContactsContactVisibilityDialogTriggerProps) => {
  const handleClickDialogTrigger = () => {
    onClick();
  };

  return (
    <>
      {triggerButtonContent.map((content) => (
        <Button
          key={content.label}
          color="gray"
          className="px-3 py-2"
          onClick={handleClickDialogTrigger}
        >
          {content.icon}
          <Text typography="body-14-semibold" textColor="gray-500">
            {content.label} ({isPhoneNumberVisible ? '공개' : '비공개'})
          </Text>
        </Button>
      ))}
    </>
  );
};
