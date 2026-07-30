import type { Metadata } from 'next';

import { PostDetailPage } from '@/_pages/feed';

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v2/posts/${postId}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return fallback;

    const result = (await response.json()) as {
      data?: {
        boardName: string;
        content: string;
        fileUrlList?: string[];
      };
    };
    const post = result.data;
    if (!post) return fallback;
    const metadataPost = post as {
      boardName: string;
      content: string;
      fileUrlList?: string[];
    };
    const description =
      stripHtml(metadataPost.content).slice(0, 160) || fallback.description;
    const title = metadataPost.boardName
      ? `${metadataPost.boardName} | CAUSW`
      : fallback.title;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        images: metadataPost.fileUrlList?.[0]
          ? [{ url: metadataPost.fileUrlList[0] }]
          : [{ url: '/images/ccssaa-logo.png' }],
      },
    };
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
