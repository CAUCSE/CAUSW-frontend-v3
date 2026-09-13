import { type ReactNode } from 'react';

import { Heart, HStack, VStack, Text, mergeStyles } from '@causw/cds';

import { type ProfileImageValue } from '@/shared/types';
import { IconCountButton, ProfileAvatar } from '@/shared/ui';

import {
  BACKEND_INACTIVE_WRITER_NICKNAME,
  INACTIVE_MESSAGE,
  UNKNOWN_AUTHOR,
  WITHDRAWN_AUTHOR_DISPLAY_NAME,
} from '../config';

interface CommentCardProps {
  author: string;
  profileImage: ProfileImageValue;
  content: string;
  time: string;
  isDeleted?: boolean;
  isBlocked?: boolean;
  isReply?: boolean;
  isOwner?: boolean;
  menuSlot?: ReactNode;
  onReplyClick?: () => void;
  isLiked?: boolean;
  likeCount?: number;
  onLikeClick?: () => void;
}

export const CommentCard = ({
  author,
  profileImage,
  content,
  time,
  isDeleted,
  isBlocked,
  isReply,
  isOwner,
  menuSlot,
  onReplyClick,
  isLiked = false,
  likeCount = 0,
  onLikeClick,
}: CommentCardProps) => {
  const isInactive = isDeleted || isBlocked;
  const isAuthorWithdrawn = author === BACKEND_INACTIVE_WRITER_NICKNAME;

  const displayAuthor = isInactive
    ? UNKNOWN_AUTHOR
    : isAuthorWithdrawn
      ? WITHDRAWN_AUTHOR_DISPLAY_NAME
      : author;
  const displayContent = isInactive
    ? isDeleted
      ? INACTIVE_MESSAGE.deleted
      : INACTIVE_MESSAGE.blocked
    : content;

  return (
    <article
      className={mergeStyles('bg-white px-5 py-3', isReply ? 'pl-10' : '')}
    >
      <HStack gap="sm" align="start">
        <ProfileAvatar
          profileImageType={profileImage.profileImageType}
          profileImageUrl={profileImage.profileImageUrl}
          size={isReply ? 20 : 28}
          className="shrink-0"
          isRestricted={isInactive || isAuthorWithdrawn}
        />
        <VStack className="w-full gap-1.5">
          <VStack className="gap-0.5">
            <HStack align="center" justify="between">
              <HStack align="center" className="gap-1.5">
                <Text typography="body-14-semibold" textColor="gray-900">
                  {displayAuthor}
                </Text>
                {/* TODO: 작성자 학번 추가 */}
                {/* <Text typography="body-14-regular" textColor="gray-400">
                  </Text> */}
                {!isInactive && isOwner && (
                  <Text
                    typography="caption-12-semibold"
                    textColor="blue-500"
                    className="rounded-sm bg-blue-100 px-1"
                  >
                    작성자
                  </Text>
                )}
              </HStack>
              {!isInactive && menuSlot}
            </HStack>

            <Text
              typography="body-15-regular"
              textColor={isInactive ? 'gray-400' : 'gray-800'}
              className="whitespace-pre-wrap"
            >
              {displayContent}
            </Text>
          </VStack>

          {!isInactive && (
            <HStack align="center" justify="start" className="gap-3">
              <IconCountButton
                icon={<Heart />}
                count={likeCount}
                active={isLiked}
                onClick={onLikeClick}
              />
              {!isReply && (
                <button
                  type="button"
                  onClick={onReplyClick}
                  className="cursor-pointer transition-opacity hover:opacity-70 active:opacity-70"
                >
                  <Text
                    typography="body-14-regular"
                    textColor="gray-400"
                    className="whitespace-nowrap"
                  >
                    답글달기
                  </Text>
                </button>
              )}
              <Text
                typography="body-14-regular"
                textColor="gray-400"
                className="whitespace-nowrap"
              >
                {time}
              </Text>
            </HStack>
          )}
        </VStack>
      </HStack>
    </article>
  );
};
