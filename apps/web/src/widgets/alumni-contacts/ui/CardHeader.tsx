'use client';

import { useRouter } from 'next/navigation';

import { Text, ChevronLeft } from '@causw/cds';

interface CardHeaderProps {
  isMyProfile?: boolean;
  isEditing?: boolean;
  onActionClick?: () => void;
}

export const CardHeader = ({
  isMyProfile,
  isEditing,
  onActionClick,
}: CardHeaderProps) => {
  const router = useRouter();

  return (
    <div className="mb-10 flex items-center justify-between px-6 pt-8">
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center border-none bg-transparent p-0"
      >
        <ChevronLeft size={18} className="mr-2 -ml-1 text-white" />
        <Text typography="subtitle-16-bold" className="text-[#F9FAFB]">
          뒤로
        </Text>
      </button>

      {isMyProfile && (
        <button
          onClick={onActionClick}
          className="cursor-pointer border-none bg-transparent p-0"
        >
          <Text
            typography="subtitle-16-bold"
            className={isEditing ? 'text-[#CACED5]' : 'text-white'}
          >
            {isEditing ? '저장하기' : '수정하기'}
          </Text>
        </button>
      )}
    </div>
  );
};
