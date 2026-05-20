import { Button, HStack, mergeStyles, Text } from '@causw/cds';

import {
  ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL,
  type AlumniContactsDetailSectionTabType,
} from '@/entities/alumni-contacts';

interface AlumniContactsDetailSectionTabsProps {
  selectedTab: AlumniContactsDetailSectionTabType;
  handleClickCategoryTab: (tab: AlumniContactsDetailSectionTabType) => void;
}

export const AlumniContactsDetailSectionTabs = ({
  selectedTab,
  handleClickCategoryTab,
}: AlumniContactsDetailSectionTabsProps) => {
  return (
    <HStack className="sticky top-[57.6px] z-100 gap-5 overflow-x-auto bg-white">
      {Object.entries(ALUMNI_CONTACTS_DETAIL_SECTION_TAB_LABEL).map(
        ([key, value]) => {
          const isSelected = selectedTab === key;
          return (
            <Button
              key={key}
              color="white"
              type="button"
              onClick={() =>
                handleClickCategoryTab(
                  key as AlumniContactsDetailSectionTabType,
                )
              }
              className={mergeStyles(
                'px-0',
                isSelected && 'rounded-none border-b-2 border-gray-700',
              )}
            >
              <Text
                typography="subtitle-16-bold"
                textColor={isSelected ? 'gray-700' : 'gray-300'}
              >
                {value}
              </Text>
            </Button>
          );
        },
      )}
    </HStack>
  );
};
