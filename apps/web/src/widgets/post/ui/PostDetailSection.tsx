import { useRef, useState } from 'react';

import { Stack } from '@causw/cds';

import { CommentList } from './CommentList';
import { PostContent } from './PostContent';

import { ReplyTarget } from '@/entities';
import { CommentForm } from '@/features';


const DUMMY_COMMENTS = [
  {
    id: 1,
    author: '가나디',
    content: '오늘 점심 메뉴 추천 좀',
    time: '8분 전',
    isAuthor: false,
    replies: [
      {
        id: 3,
        author: '가나디',
        content: '오늘 점심 메뉴 추천 좀',
        time: '8분 전',
        isAuthor: true,
        replies: [],
      },
    ],
  },
  {
    id: 2,
    author: '익명',
    content: '오픈랩 신청 날짜가 정확히 언제인가요?',
    time: '방금',
    isAuthor: false,
    replies: [],
  },
];

export const PostDetailSection = () => {
  const [activeMenuId, setActiveMenuId] = useState<number | string | null>(
    null,
  );
  const [replyTarget, setReplyTarget] = useState<ReplyTarget>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const closeMenu = () => setActiveMenuId(null);
  const toggleMenu = (id: number | string) => {
    setActiveMenuId((prev) => (prev === id ? null : id));
  };

  const handleReply = (target: ReplyTarget) => {
    setReplyTarget(target);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      <Stack
        gap="none"
        className="h-full overflow-scroll md:rounded-t-lg [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <PostContent
          postId="post-header" // TODO: id 로직 검토
          activeMenuId={activeMenuId}
          onToggleMenu={toggleMenu}
          onCloseMenu={closeMenu}
        />

        <CommentList
          comments={DUMMY_COMMENTS}
          activeMenuId={activeMenuId}
          onToggleMenu={toggleMenu}
          onCloseMenu={closeMenu}
          onReply={handleReply}
        />
      </Stack>

      <CommentForm
        replyTarget={replyTarget}
        onCancelReply={() => setReplyTarget(null)}
        inputRef={inputRef}
      />
    </>
  );
};
