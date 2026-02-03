// 로딩 컴포넌트 위치

import { VStack } from '@causw/cds';

import { Spinner } from './temp/Spinner';

interface SuspenseViewProps {
  size?: number;
}

export function SuspenseView({ size = 30 }: SuspenseViewProps) {
  return (
    <VStack
      align="center"
      justify="center"
      gap="none"
      className="h-full w-full p-5"
    >
      <Spinner size={size} />
    </VStack>
  );
}
