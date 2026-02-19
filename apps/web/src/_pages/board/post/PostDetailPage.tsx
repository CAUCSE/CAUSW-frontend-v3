'use client';

import { useRouter } from 'next/navigation';

import { ActionHeader } from '@/shared/ui/ActionHeader';

import { useBreakpoint } from '@/shared';
import { PostDetailSection } from '@/widgets';

export const PostDetailPage = () => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-8 md:py-6">
      <ActionHeader background={isMobileSize ? 'white' : 'transparent'}>
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <PostDetailSection />
    </div>
  );
};
