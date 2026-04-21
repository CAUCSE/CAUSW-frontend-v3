import { Text } from '@causw/cds';

import { useMyInfoSuspenseQuery } from '@/entities/auth';

export function UserGreetingHeader() {
  const { data } = useMyInfoSuspenseQuery();

  return (
    <Text typography="title-32-bold">{`${data?.name}님, 반갑습니다!`}</Text>
  );
}
