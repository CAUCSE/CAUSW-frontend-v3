import { Skeleton, Text } from '@causw/cds';

import { useGetMeQuery } from '@/features/auth';

export function UserGreeting() {
  const { data, isLoading } = useGetMeQuery();

  if (isLoading) {
    return <Skeleton width={400} height={52} />;
  }

  return (
    <Text typography="title-32-bold">{`${data?.name}님, 반갑습니다!`}</Text>
  );
}
