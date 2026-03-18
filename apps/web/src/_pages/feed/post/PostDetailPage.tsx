'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { PostDetailSection } from '@/widgets/post';

import { useBreakpoint, useIsMounted } from '@/shared/hooks';
import { ActionHeader, QueryErrorBoundary, SuspenseView } from '@/shared/ui';

interface PostDetailPageProps {
  postId: string;
}

export const PostDetailPage = ({ postId }: PostDetailPageProps) => {
  const router = useRouter();

  const { isMobileSize } = useBreakpoint();

  const isMounted = useIsMounted();

  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-8 md:py-6">
      <ActionHeader background={isMobileSize ? 'white' : 'gray'}>
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="게시글을 불러오지 못했어요.">
        {isMounted ? (
          <Suspense fallback={<SuspenseView />}>
            <PostDetailSection postId={postId} />
          </Suspense>
        ) : (
          <SuspenseView />
        )}
      </QueryErrorBoundary>
    </div>
  );
};
