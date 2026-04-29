import { Avatar, Flex, HStack, OfficialColored, Text } from '@causw/cds';

import { formatRelativeTime, getProfileImageUrl } from '@/shared/lib';
import { type ProfileImageValue } from '@/shared/types';

import { type PostAction } from '../config';

import { PostActionMenu } from './PostActionMenu';

interface PostHeaderProps {
  authorName: string;
  createdAt: string;
  profileImage?: ProfileImageValue;
  isOfficial?: boolean;
  isMine: boolean;
  onAction: (action: PostAction) => void;
  hideActionMenu?: boolean;
}

/**
 * 게시글 상단 헤더 컴포넌트입니다. (피드, 상세 페이지 등에서 공통 사용)
 * 작성자 정보(프로필, 이름, 시간 등)와 우측 액션 메뉴를 렌더링합니다.
 * @param isMine - 본인 게시글 여부 (true: 수정/삭제, false: 신고/차단 메뉴 제공)
 * @param onAction - 메뉴 항목 클릭 시 실행될 핸들러 함수
 */
export const PostHeader = ({
  authorName,
  createdAt,
  profileImage,
  isOfficial = false,
  isMine,
  onAction,
  hideActionMenu = false,
}: PostHeaderProps) => {
  const profileImageUrl = profileImage
    ? getProfileImageUrl({
        profileImageType: profileImage.profileImageType,
        profileImageUrl: profileImage.profileImageUrl,
        width: 40,
      })
    : '';

  return (
    <Flex as="header" gap="none" align="center">
      <HStack gap="sm" align="center" className="flex-1 gap-2.5">
        <Avatar size={40} src={profileImageUrl} className="shrink-0" />

        <HStack gap="sm" align="center">
          <HStack gap="xs" align="center">
            <Text typography="subtitle-16-bold" textColor="gray-800">
              {authorName}
            </Text>
            {isOfficial && <OfficialColored size={12} />}
          </HStack>

          <Text typography="body-16-regular" textColor="gray-500">
            {formatRelativeTime(createdAt)}
          </Text>
        </HStack>
      </HStack>

      {!hideActionMenu && (
        <PostActionMenu isMine={isMine} onAction={onAction} />
      )}
    </Flex>
  );
};
