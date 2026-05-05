import { Flex } from '@causw/cds';

import { SuspenseView } from '@/shared/ui';

export default function Loading() {
  return (
    <Flex align="center" justify="center" className="h-screen w-full p-5">
      <SuspenseView />
    </Flex>
  );
}
