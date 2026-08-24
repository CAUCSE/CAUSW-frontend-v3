import type { Metadata } from 'next';

import { PostDetailPage } from '@/_pages/feed';

import { getPost, type GetPostResponseDto } from '@/entities/post';

import { stripHtml } from '@/shared/lib/sanitizer';

const createPostMetadata = (post: GetPostResponseDto): Metadata => {
  const fallback = {
    title: 'CAUSW 게시글',
    description: 'CAUSW 커뮤니티 게시글입니다.',
  };
  const plainTextContent = stripHtml(post.content).replace(/\s+/g, ' ').trim();
  const description = plainTextContent.slice(0, 160) || fallback.description;
  const title = post.boardName ? `${post.boardName} | CAUSW` : fallback.title;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.fileUrlList[0]
        ? [{ url: post.fileUrlList[0] }]
        : [{ url: '/images/ccssaa-logo.png' }],
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const fallback = {
    title: 'CAUSW 게시글',
    description: 'CAUSW 커뮤니티 게시글입니다.',
  };

  try {
    const post = await getPost(postId);
    return createPostMetadata(post);
  } catch {
    return fallback;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  return <PostDetailPage postId={postId} />;
}
