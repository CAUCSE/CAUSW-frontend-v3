'use client';

import { PostDetailSection } from '@/widgets/post';

import { BOARD_GROUP } from '@/entities/board';

import { ROUTES } from '@/shared/constants';
import {
  ActionHeader,
  HydrationSuspense,
  QueryErrorBoundary,
  SuspenseView,
} from '@/shared/ui';

export const PostDetailPage = ({ postId }: { postId: string }) => {
  return (
    <div className="mx-auto flex h-screen max-w-225 flex-col md:px-5 md:pb-5">
      <ActionHeader background="white">
        <ActionHeader.BackButton fallbackHref={ROUTES.COMMUNITY}>
          뒤로
        </ActionHeader.BackButton>
      </ActionHeader>

      <QueryErrorBoundary fallbackMessage="게시글을 불러오지 못했어요.">
        <HydrationSuspense fallback={<SuspenseView />}>
          <PostDetailSection
            postId={postId}
            boardGroup={BOARD_GROUP.COMMUNITY}
          />
        </HydrationSuspense>
      </QueryErrorBoundary>
    </div>
  );
};
