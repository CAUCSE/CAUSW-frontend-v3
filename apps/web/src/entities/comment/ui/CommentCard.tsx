import { type ReactNode } from 'react';

import { Avatar, Heart, HStack, VStack, Text } from '@causw/cds';

import { getProfileImageUrl } from '@/shared/lib';
import { type ProfileImageValue } from '@/shared/types';
import { IconCountButton } from '@/shared/ui';

interface CommentCardProps {
  author: string;
  profileImage: ProfileImageValue;
  content: string;
  time: string;
  isDeleted?: boolean;
  isBlocked?: boolean;
  isReply?: boolean;
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
  menuSlot,
  onReplyClick,
  isLiked = false,
  likeCount = 0,
  onLikeClick,
}: CommentCardProps) => {
  const isInactive = isDeleted || isBlocked;

  const profileImageUrl = profileImage
    ? getProfileImageUrl({
        profileImageType: profileImage.profileImageType,
        profileImageUrl: profileImage.profileImageUrl,
        width: 36,
      })
    : '';

  return (
    <article className={`bg-white px-5 py-3 ${isReply && 'pl-12'}`}>
      <HStack align={isInactive ? 'center' : 'start'} className="gap-3">
        <Avatar
          size={36}
          src={profileImageUrl}
          className="my-1 shrink-0"
          isRestricted={isBlocked}
        />
        {isInactive ? (
          <VStack gap="none">
            <Text typography="body-15-regular" textColor="gray-400">
              {isDeleted ? '삭제된 댓글입니다' : '차단된 사용자의 댓글입니다'}
            </Text>
          </VStack>
        ) : (
          <VStack className="w-full gap-3">
            <VStack gap="none">
              <HStack align="center" justify="between">
                <HStack gap="sm" align="center">
                  <Text typography="body-15-semibold" textColor="gray-800">
                    {author}
                  </Text>
                  <Text typography="body-15-regular" textColor="gray-500">
                    {time}
                  </Text>
                </HStack>

                {menuSlot}
              </HStack>
              <Text
                typography="body-15-regular"
                textColor="gray-800"
                className="whitespace-pre-wrap"
              >
                {content}
              </Text>
            </VStack>

            <HStack align="center" justify={isReply ? 'end' : 'between'}>
              {!isReply && (
                <button
                  type="button"
                  onClick={onReplyClick}
                  className="cursor-pointer transition-opacity hover:opacity-70 active:opacity-70"
                >
                  <Text typography="body-14-medium" textColor="gray-400">
                    답글달기
                  </Text>
                </button>
              )}

              <IconCountButton
                icon={<Heart />}
                count={likeCount}
                active={isLiked}
                onClick={onLikeClick}
              />
            </HStack>
          </VStack>
        )}
      </HStack>
    </article>
  );
};
