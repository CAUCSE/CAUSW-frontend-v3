'use client';

import { useRouter } from 'next/navigation';

import { PostDetailSection } from '@/widgets/post';

import { useBreakpoint } from '@/shared/hooks';
import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

export const PostDetailPage = ({ postId }: { postId: string }) => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-8 md:py-6">
      <ActionHeader background={isMobileSize ? 'white' : 'gray'}>
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="게시글을 불러오지 못했어요.">
        <HydrationSuspense fallback={<SuspenseView />}>
          <PostDetailSection postId={postId} />
        </HydrationSuspense>
      </QueryErrorBoundary>
    </div>
  );
};
