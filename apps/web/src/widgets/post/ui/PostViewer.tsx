import {
  Avatar,
  Chip,
  Heart,
  HStack,
  OfficialColored,
  Share,
  Stack,
  Text,
} from '@causw/cds';

import { PostActionMenu } from '@/features';

interface PostViewerProps {
  postId: number | string;
  activeMenuId: number | string | null;
  onToggleMenu: (id: string | number) => void;
  onCloseMenu: () => void;
}

export const PostViewer = ({
  postId,
  activeMenuId,
  onToggleMenu,
  onCloseMenu,
}: PostViewerProps) => {
  return (
    <Stack
      as="section"
      className="gap-6 rounded-t-lg bg-white px-5 py-2 md:p-5"
    >
      <Stack gap="sm">
        {/* ✅ 게시글 헤더 */}
        <HStack as="header" align="center" justify="between">
          <HStack gap="sm" align="center" className="gap-2.5">
            <Avatar size="sm" />
            <HStack gap="sm" align="center">
              <HStack gap="xs" align="center">
                <Text typography="subtitle-16-bold" textColor="gray-800">
                  소프트웨어학부
                </Text>
                <OfficialColored size={12} />
              </HStack>
              <Text typography="body-16-regular" textColor="gray-500">
                8분 전
              </Text>
            </HStack>
          </HStack>

          <PostActionMenu
            id={postId}
            isMine={true}
            isOpen={activeMenuId === 'post-header'}
            onToggle={onToggleMenu}
            onClose={onCloseMenu}
          />
        </HStack>

        {/* ✅ 게시글 본문 */}
        <section className="prose whitespace-pre-wrap">
          <Text as="p" typography="body-16-regular" textColor="gray-800">
            (구글폼 링크 수정) 2025-2학기 일반대학원 컴퓨터공학과 오픈랩(OPEN
            LAB) 오프라인 개최 안내
          </Text>
        </section>
      </Stack>

      {/* ✅ 게시글 하단 칩 */}
      <HStack gap="sm">
        <Chip
          asChild
          color="lightgray"
          size="sm"
          className="rounded-sm px-3 py-2"
        >
          <HStack as="button" gap="sm" align="center" className="gap-1.5">
            <Heart size={16} />
            <span>좋아요</span>
            <span>0</span>
          </HStack>
        </Chip>
        <Chip
          asChild
          color="lightgray"
          size="sm"
          className="rounded-sm px-3 py-2"
        >
          <HStack as="button" gap="sm" align="center" className="gap-1.5">
            <Share size={16} />
            <span>공유하기</span>
          </HStack>
        </Chip>
      </HStack>
    </Stack>
  );
};
