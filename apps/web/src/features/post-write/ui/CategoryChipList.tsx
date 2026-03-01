import { Chip, HStack, mergeStyles } from '@causw/cds';

import { POST_CATEGORIES, PostCategory } from '@/entities/post';

interface CategoryChipListProps {
  selectedCategory: PostCategory | null;
  onSelectCategory: (category: PostCategory) => void;
  onClose: () => void;
}
export const CategoryChipList = ({
  selectedCategory,
  onSelectCategory,
  onClose,
}: CategoryChipListProps) => {
  return (
    <HStack gap="sm" className="flex-wrap">
      {POST_CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <Chip
            key={category}
            asChild
            color="lightgray"
            className={mergeStyles(
              'cursor-pointer rounded-sm transition-colors',
              isActive
                ? 'bg-gray-700 text-white opacity-80'
                : 'hover:bg-gray-200 active:bg-gray-200',
            )}
          >
            <button
              onClick={() => {
                onSelectCategory(category);
                onClose();
              }}
            >
              {category}
            </button>
          </Chip>
        );
      })}
    </HStack>
  );
};
