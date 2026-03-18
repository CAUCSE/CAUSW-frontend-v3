'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { PostDetailSection } from '@/widgets/post';

import { ActionHeader, QueryErrorBoundary, SuspenseView } from '@/shared/ui';

interface PostDetailPageProps {
  postId: string;
}

export const PostDetailPage = ({ postId }: PostDetailPageProps) => {
  const router = useRouter();

  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-8 md:py-6">
      <ActionHeader background="transparent" isSticky={false}>
        <ActionHeader.BackButton onClick={() => router.back()}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="게시글을 불러오지 못했어요.">
        <Suspense fallback={<SuspenseView />}>
          <PostDetailSection postId={postId} />
        </Suspense>
      </QueryErrorBoundary>
    </div>
  );
};
