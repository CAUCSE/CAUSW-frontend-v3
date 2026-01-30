import { Spacer, Text, VStack, CommentColored } from '@causw/cds';

interface NoDataViewProps {
  message?: string;
  icon?: React.ReactNode;
}

export function NoDataView({ message, icon }: NoDataViewProps) {
  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className="h-full w-full p-5"
    >
      {icon || <CommentColored className="text-gray-300" size={56} />}
      <Spacer size={6} />
      <Text typography="body-16-regular" textColor="gray-500">
        {message || '불러올 데이터가 없어요'}
      </Text>
    </VStack>
  );
}
