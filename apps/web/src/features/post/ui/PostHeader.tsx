import { Flex, HStack, Text } from '@causw/cds';

import { type ProfileImageValue } from '@/shared/types';
import { ProfileAvatar } from '@/shared/ui';

import { type PostAction } from '../config';

import { PostActionMenu } from './PostActionMenu';

interface PostHeaderProps {
  authorName: string;
  profileImage?: ProfileImageValue;
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
  profileImage,
  isMine,
  onAction,
  hideActionMenu = false,
}: PostHeaderProps) => {
  return (
    <Flex as="header" gap="none" align="center">
      <HStack align="center" className="flex-1 gap-1.5">
        {profileImage ? (
          <ProfileAvatar
            profileImageType={profileImage.profileImageType}
            profileImageUrl={profileImage.profileImageUrl}
            size={20}
            className="shrink-0"
          />
        ) : null}

        <Text typography="body-14-semibold" textColor="gray-900">
          {authorName}
        </Text>
      </HStack>

      {!hideActionMenu && (
        <PostActionMenu isMine={isMine} onAction={onAction} />
      )}
    </Flex>
  );
};
