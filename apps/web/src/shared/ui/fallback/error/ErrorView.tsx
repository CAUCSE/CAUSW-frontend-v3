import { type FallbackProps } from 'react-error-boundary';
import { Button, Spacer, Text, VStack } from '@causw/cds';
import { WarningIcon } from '../../temp';

interface ErrorViewProps extends FallbackProps {
  errorMessage?: string;
}

export function ErrorView({
  errorMessage,
  resetErrorBoundary,
}: ErrorViewProps) {
  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className="h-full w-full p-5"
    >
      <WarningIcon className="text-red-500" />
      <Spacer size={4} />
      <Text typography="subtitle-20-bold">
        {errorMessage || '문제가 발생했어요'}
      </Text>
      <Spacer size={10} />
      <Button onClick={resetErrorBoundary} color="red">
        다시 시도
      </Button>
    </VStack>
  );
}
