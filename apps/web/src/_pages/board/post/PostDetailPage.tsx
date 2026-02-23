'use client';

import { useRouter } from 'next/navigation';

import { PostDetailSection } from '@/widgets/post';

import { ActionHeader } from '@/shared/ui/ActionHeader';

import { useBreakpoint } from '@/shared';

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
