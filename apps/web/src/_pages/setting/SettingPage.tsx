import { QueryClient } from '@tanstack/react-query';

import { SettingOverview } from '@/widgets/setting';

import { authQueryOptions } from '@/entities/auth';

export async function SettingPage() {
  const queryClient = new QueryClient();
  const myInfo = await queryClient.fetchQuery(authQueryOptions.me());

  return <SettingOverview myInfo={myInfo} />;
}
