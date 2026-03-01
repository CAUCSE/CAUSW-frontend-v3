'use client';

import { BottomSheet, Dialog, Text, VStack } from '@causw/cds';

import { PostCategory } from '@/entities/post';

import { useBreakpoint } from '@/shared/hooks';

import { CategoryChipList } from './CategoryChipList';

interface PostCategorySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategory: PostCategory | null;
  onSelectCategory: (category: PostCategory) => void;
}

export const PostCategorySelector = ({
  open,
  onOpenChange,
  selectedCategory,
  onSelectCategory,
}: PostCategorySelectorProps) => {
  const { isMobileSize } = useBreakpoint();

  if (isMobileSize)
    return (
      <BottomSheet open={open} onOpenChange={onOpenChange}>
        <BottomSheet.Content aria-describedby={undefined} className="z-modal">
          <VStack gap="lg" align="start">
            <BottomSheet.Header title="게시글 주제를 선택해주세요." />
            <BottomSheet.Body>
              <CategoryChipList
                selectedCategory={selectedCategory}
                onSelectCategory={onSelectCategory}
                onClose={() => onOpenChange(false)}
              />
            </BottomSheet.Body>
          </VStack>
        </BottomSheet.Content>
      </BottomSheet>
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={420} className="pt-8" aria-describedby={undefined}>
        <Dialog.Title asChild>
          <Text as="h2" typography="subtitle-18-bold" textColor="gray-700">
            게시글 주제를 선택해주세요.
          </Text>
        </Dialog.Title>
        <CategoryChipList
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          onClose={() => onOpenChange(false)}
        />
      </Dialog.Content>
    </Dialog>
  );
};
